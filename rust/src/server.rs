/** rust.src.server.rs
 *  Server methods for program, listens to websocket connections that 
 *  are secure via ssl, though its not needed, its dope to use.
 */

// Mandatory Imports
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::accept_async;
use std::error::Error;
use std::sync::{Arc, Mutex};

// Initialize Connection Implementation
 pub struct Connection;

 // Stage Implementation[]
 impl Connection {

    // Handle Connections
    async fn handle(&mut self, stream: tokio::net::TcpStream) {
        if let Err(e) = self.process(stream).await {
            eprintln!("Error Connection: {}", e);
        }
    }

    // Process Connections
    async fn process(&mut self, stream: tokio::net::TcpStream) -> Result<(), Box<dyn Error>> {
        accept_async(stream).await.expect("[~] Error During Websocket Process");
        println!("Connected");
        return Ok(());
    }

    // Initialize Everything
    #[tokio::main]
    async fn init(&mut self) {
        let ip_address = "127.0.0.1:2492";
        let tcp_listener = TcpListener::bind(&ip_address).await.expect("Failed to bind listener with address");

        println!("Websocket running on: {}", ip_address);

        while let Ok((stream, _)) = tcp_listener.accept().await {
            tokio::spawn(self.handle(stream));
        }
    }
 }