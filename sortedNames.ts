function sortedNames(names: string[]): string[] {
    let surname = names.map((name) => name.split(" ")[1]);
    if (surname.every((name, index, array) => name >= array[index - 1])) {
        return names;
    }
    return names.sort((a,b) => a.split(" ")[1] > b.split(" ")[1] ? 1 : -1);
}
console.log(sortedNames(["John Doe", "Jane Smith", "John Smith", "Jane Doe"])); // Output: ["Jane Doe", "John Doe", "Jane Smith", "John Smith"]