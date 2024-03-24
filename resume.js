//
// Destructuring..
// 

const person = {
    name: 'Agus',
    lastname: 'Barreca',
    aditionalInfo: {
        pet: 'Otto'
    }
}

const helloPerson = (person) => {
    console.log(`Hi, ${person.name} ${person.lastname}`)
}

const helloPerson2 = ({ name, lastname }) => {
    console.log(`Hi, ${name} ${lastname}`)
}

const helloPetPerson = ({ aditionalInfo: { pet } }) => {
    console.log(`Hi, ${pet}`)
}

//
// Object Literal Enhancement
//

const name2 = "Tallac";
const elevation = 9738;
const funHike = { name2, elevation };

//
// The Spread Operator
//

// The spread operator can also be used to get the remaining items in the array:
const lakes = ["Donner", "Marlette", "Fallen Leaf", "Cascade"];
const [first, ...others] = lakes;
console.log(others.join(", ")); // Marlette, Fallen Leaf, Cascade


// We can also use the three-dot syntax to collect function arguments as an array. When
// used in a function, these are called rest parameters.

function directions(...args) {
    let [start, ...remaining] = args;
    let [finish, ...stops] = remaining.reverse();
    console.log(`drive through ${args.length} towns`);
    console.log(`start in ${start}`);
    console.log(`the destination is ${finish}`);
    console.log(`stopping ${stops.length} times in between`);
}
directions("Truckee", "Tahoe City", "Sunnyside", "Homewood", "Tahoma");