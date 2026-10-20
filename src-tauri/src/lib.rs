use std::io::Write;
use std::path::PathBuf;

use tauri::{Manager, WebviewWindowBuilder};

fn log_line(message: &str) {
    let path = std::env::temp_dir().join("dsh-launcher.log");
    if let Ok(mut file) = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(path)
    {
        let _ = writeln!(file, "{message}");
    }
}

#[cfg(windows)]
fn show_error_dialog(message: &str) {
    use windows::core::HSTRING;
    use windows::Win32::UI::WindowsAndMessaging::{MessageBoxW, MB_ICONERROR, MB_OK};

    unsafe {
        let _ = MessageBoxW(
            None,
            &HSTRING::from(message),
            &HSTRING::from("DSH Launcher"),
            MB_OK | MB_ICONERROR,
        );
    }
}

#[cfg(not(windows))]
fn show_error_dialog(_message: &str) {}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/// WebView2 数据目录：优先放在 exe 同级的 `.webview2`。
///
/// 这样开发版和绿色版 exe 都不依赖 `%LOCALAPPDATA%` 的权限；
/// 只有 exe 目录不可写（例如装进 Program Files）时才回退到 LocalAppData。
fn webview_data_dir(app: &tauri::AppHandle) -> Result<PathBuf, Box<dyn std::error::Error>> {
    let exe = std::env::current_exe()?;
    let parent = exe.parent().ok_or_else(|| {
        std::io::Error::new(
            std::io::ErrorKind::Other,
            "executable has no parent directory",
        )
    })?;

    let local = parent.join(".webview2");
    match std::fs::create_dir_all(&local) {
        Ok(()) => {
            log_line(&format!("[data] exe-relative {}", local.display()));
            Ok(local)
        }
        Err(error) => {
            log_line(&format!("[data] exe-relative failed: {error}"));
            let fallback = app.path().app_local_data_dir()?.join("WebView2");
            log_line(&format!("[data] fallback {}", fallback.display()));
            Ok(fallback)
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::panic::set_hook(Box::new(|info| {
        log_line(&format!("[panic] {info}"));
    }));
    log_line("=== launcher start ===");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            log_line("[setup] begin");

            let result = (|| -> Result<(), Box<dyn std::error::Error>> {
                if let Some(config) = app.config().app.windows.first().cloned() {
                    let data_dir = webview_data_dir(app.handle())?;

                    log_line(&format!("[setup] create_dir_all {}", data_dir.display()));
                    std::fs::create_dir_all(&data_dir).map_err(|e| {
                        std::io::Error::new(
                            std::io::ErrorKind::Other,
                            format!("create webview data dir {} failed: {e}", data_dir.display()),
                        )
                    })?;

                    log_line("[setup] data dir ready");
                    log_line("[setup] building window");

                    WebviewWindowBuilder::from_config(app.handle(), &config)?
                        .data_directory(data_dir)
                        .build()
                        .map_err(|e| {
                            std::io::Error::new(
                                std::io::ErrorKind::Other,
                                format!("build webview window failed: {e}"),
                            )
                        })?;

                    log_line("[setup] window built");
                } else {
                    log_line("[setup] no window config");
                }

                log_line("[setup] done");
                Ok(())
            })();

            if let Err(error) = result {
                log_line(&format!("[fatal] {error}"));
                let log_path = std::env::temp_dir().join("dsh-launcher.log");
                show_error_dialog(&format!(
                    "DSH Launcher 启动失败：\n{error}\n\n日志文件：{}",
                    log_path.display()
                ));
                std::process::exit(1);
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
