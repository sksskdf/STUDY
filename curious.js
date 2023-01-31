const some_object = {
  some_property: {
    value: 0,
    next : null
  },
  some_property2: "hello",
};

let some_property_ref = some_object.some_property;

console.log(some_property_ref);

some_property_ref.next = 1;

console.log(some_property_ref);
console.log(some_object.some_property);
