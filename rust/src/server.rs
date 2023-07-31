/** rust.src.server.rs
 *  Server methods for program, listens to websocket connections that 
 *  are secure via ssl, though its not needed, its dope to use.
 */

// Mandatory Imports
use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use std::error::Error;

// Initialize Connection Implementation
 pub struct Connection;

 // Stage Implementation[]
 impl Connection {

    // Handle Connections
    async fn handle(stream: tokio::net::TcpStream) {
        if let Err(e) = Connection::process(stream).await {
            eprintln!("Error Connection: {}", e);
        }
    }

    // Process Connections
    async fn process(stream: tokio::net::TcpStream) -> Result<(), Box<dyn Error>> {
        accept_async(stream).await.expect("[~] Error During Websocket Process");
        println!("Connected");
        return Ok(());
    }

    // Initialize Everything
    #[tokio::main]
    pub async fn init() {
        let ip_address = "127.0.0.1:2492";
        let tcp_listener = TcpListener::bind(&ip_address).await.expect("Failed to bind listener with address");
        
        println!("Init");

        while let Ok((stream, _)) = tcp_listener.accept().await {
            Connection::handle(stream).await            
        }
    }
 }