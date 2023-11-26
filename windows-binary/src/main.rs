#![windows_subsystem = "windows"]
use std::net::UdpSocket;
use std::str;
use std::thread;
use std::time::Duration;
use std::process::Command;

fn main() {
    let socket = UdpSocket::bind("0.0.0.0:50000").expect("Could not bind socket");
    let mut buf = [0u8; 25];

    loop {
        let (received, _) = socket.recv_from(&mut buf).expect("Could not receive data");

        let message = str::from_utf8(&buf[..received]).expect("Could not convert to string");

        if message == "poweroff-securitykey" {
            Command::new("shutdown")
                .arg("-s")
                .spawn()
                .expect("Could not initiate shutdown");
            std::process::exit(0);
        }

        thread::sleep(Duration::from_secs(5));
    }
}

//compile with rustc --target=x86_64-pc-windows-msvc --edition=2021 -o alexa_shutdown.exe shutdown.rs --crate-type bin
