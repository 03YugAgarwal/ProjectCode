const LANGUAGE_VERSIONS = {
    python: "3.10.0",
    javascript: "1.32.3",
    typescript: "5.0.3",
    java: "15.0.2",
    cpp: "10.2.0",
    c: "10.2.0",
    csharp: "6.12.0",
    php: "8.2.3"
}

const BASE_URL = 'http://localhost:9000'

const CODE_SNIPPETS = {
    python: `def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`,

    javascript: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,

    typescript: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,

    java: `public class Main {
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }

    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}
`,

    csharp: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine(Greet("World"));
    }

    public static string Greet(string name) {
        return $"Hello, {name}!";
    }
}
`,

    php: `<?php
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>
`
};

module.exports = {LANGUAGE_VERSIONS}