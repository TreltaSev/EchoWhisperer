/** rust.src.server.rs
 *  Server methods for program, listens to websocket connections that 
 *  are secure via ssl, though its not needed, its dope to use.
 */
extern crate ws;

use ws::listen;

pub struct Connection;

impl Connection {
    
    pub fn new() {
        if let Err(error) = listen("127.0.0.1:3012", |out| {
            move |msg| {
                println!("Server got message '{}'. ", msg);    
                out.send(msg)
            }
        }) {
            println!("Failed to create WebSocket due to {}", error);
        }
    }
}   