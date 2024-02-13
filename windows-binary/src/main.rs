#![windows_subsystem = "windows"]
use std::net::UdpSocket;
use std::time::Duration;
use std::thread;
use std::io;
use std::process::Command;

extern crate winapi;
use winapi::um::winuser::{MessageBoxA, MB_OKCANCEL, MB_ICONEXCLAMATION, HWND_DESKTOP};

const POWEROFF_KEY: &str = "poweroff-securitykey";

fn main() -> io::Result<()> {
    // Setting up UDP socket
    let socket = UdpSocket::bind("0.0.0.0:50000").expect("Could not bind socket");
    socket.set_nonblocking(true)?;

    // Listening for UDP packets
    let mut buf = [0; 25];
    loop {
        match socket.recv_from(&mut buf) {
            Ok((size, _)) => {
                let received = String::from_utf8_lossy(&buf[..size]);
                if received.trim() == POWEROFF_KEY {
                    show_popup()?;
                }
            },
            Err(_) => (),
        }
        thread::sleep(Duration::from_millis(100));
    }
}
fn show_popup() -> io::Result<()> {
    Command::new("shutdown")
    .arg("/s")
    .arg("/t")
    .arg("10")
    .arg("/c")
    .arg(" ")
    .spawn()
    .expect("Could not initiate shutdown");    

    println!("Shutting down in 10 seconds");

    let message = "Your computer will shut down in 10 seconds. Press OK to proceed or Cancel to abort.";
    let title = "Remote Shutdown Warning";
    let message_ansi = std::ffi::CString::new(message).expect("CString::new failed");
    let title_ansi = std::ffi::CString::new(title).expect("CString::new failed");
    unsafe {
        let result = MessageBoxA(HWND_DESKTOP, message_ansi.as_ptr(), title_ansi.as_ptr(), MB_OKCANCEL | MB_ICONEXCLAMATION);
        
        if result == 2 {
            println!("Shutdown cancelled.");
            Command::new("shutdown")
            .arg("/a")
            .spawn()
            .expect("Could not cancel shutdown");
            return Ok(());
        }
    }
    Ok(())
}