
/* OOP Attempt, impl should create a 
object which can hold self values
and methods.
For impl, you need to also add a struct
*/
pub struct Test {
    var: String
}

/* Basic implementation of a enum and instance.
this acts like an 'object' but it only has one method, foo'.
*/
impl Test {    

    /* Replaces self.var with "Heheheha" just so I can test out methods */
    pub fn foo(&mut self) -> bool {
        self.var = String::from("Heheheha");
        return true;
    }

    /* Prints out self.var */
    pub fn bar(&mut self) {
        println!("{var:}", var=self.var)
    }

}

/* Default implementation for this implementation of an enum
allows for the actual creation of the object by returning self when running Test::default(); */
impl Default for Test {
    fn default() -> Self {
        Self {var: String::from("test")}
    }
}

/* Just like C++, rust works with a main method as its entry point and now I will go to bed to mimir */
fn main() {
    let mut default_instance = Test::default();
    default_instance.bar();
    default_instance.foo();
    default_instance.bar();    
}