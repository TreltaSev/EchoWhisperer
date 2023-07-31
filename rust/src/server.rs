/** rust.src.server.rs
 *  Server methods for program, listens to websocket connections that 
 *  are secure via ssl, though its not needed, its dope to use.
 */

// Mandatory Imports
use tokio::net::TcpListener;
use tokio_tungstenite::tungstenite::protocol::Message;
use tokio_tungstenite::accept_async;

// Initialize Connection Implementation
 pub struct Connection;

 // Stage Implementation[]
 impl Connection {

    // Handle Connections
    async fn handle(stream: tokio::net::TcpStream) {
        if let Err(e) = None {}
    }
 }