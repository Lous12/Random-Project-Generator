export const constraints = [
  {
    "text": "No database. Derive everything from local files, memory, or browser storage.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No external API. The core must remain useful offline.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "All user data must remain on the local machine.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The first useful result should appear in under one second.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Exported output must be plain text, JSON, CSV, HTML, or Markdown.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No user accounts or login flow.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No cloud storage.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The MVP must stay under 1,000 lines of application code.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [
      "beginner",
      "easy",
      "medium"
    ],
    "scopes": [
      "hour",
      "evening",
      "weekend"
    ]
  },
  {
    "text": "Core functionality must be usable entirely from the keyboard.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Every generated result must be reproducible from a seed.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not collect telemetry.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Configuration must fit in one human-readable file.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The project must work with a demo dataset bundled in the repository.",
    "tags": [
      "all"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The project must have zero required runtime dependencies.",
    "tags": [
      "cli",
      "system",
      "library",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Distribute it as a single executable.",
    "tags": [
      "cli",
      "system",
      "backend"
    ],
    "forbid": [
      "web",
      "browser"
    ],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The tool must be easy to run with one command.",
    "tags": [
      "cli",
      "backend",
      "automation",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The web version must be deployable to GitHub Pages.",
    "tags": [
      "web",
      "frontend",
      "browser"
    ],
    "forbid": [
      "backend",
      "network"
    ],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Use no frontend framework.",
    "tags": [
      "web",
      "frontend",
      "browser"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Use only browser platform APIs and static assets.",
    "tags": [
      "web",
      "frontend",
      "browser"
    ],
    "forbid": [
      "backend"
    ],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Store persistent state only in localStorage or IndexedDB.",
    "tags": [
      "web",
      "frontend",
      "browser"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The entire UI must work without a mouse.",
    "tags": [
      "web",
      "frontend",
      "desktop",
      "cli"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The project must work without JavaScript.",
    "tags": [
      "website"
    ],
    "forbid": [
      "app",
      "browser"
    ],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Keep the shipped web bundle under 150 KB gzipped.",
    "tags": [
      "web",
      "frontend",
      "browser"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No npm packages in the final runtime bundle.",
    "tags": [
      "web",
      "frontend",
      "node"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not use a CSS framework.",
    "tags": [
      "web",
      "frontend"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Make it installable as a PWA and usable offline.",
    "tags": [
      "web",
      "frontend",
      "offline"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No background server process after startup.",
    "tags": [
      "desktop",
      "cli",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not write outside a single application data directory.",
    "tags": [
      "desktop",
      "system",
      "cli"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Provide a dry-run mode for every destructive command.",
    "tags": [
      "cli",
      "system",
      "files",
      "automation"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Never delete files permanently; move them to a recoverable quarantine.",
    "tags": [
      "files",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not require administrator/root privileges.",
    "tags": [
      "system",
      "network",
      "files"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Work correctly on Windows, macOS, and Linux.",
    "tags": [
      "cli",
      "desktop",
      "system",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Read from stdin and support piping output to stdout.",
    "tags": [
      "cli"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Exit with meaningful non-zero exit codes on failures.",
    "tags": [
      "cli",
      "automation",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No interactive prompts unless explicitly enabled.",
    "tags": [
      "cli",
      "automation"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Every command must have a --json output mode.",
    "tags": [
      "cli",
      "devtools",
      "automation"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not shell out to Git; parse repository data directly.",
    "tags": [
      "git"
    ],
    "forbid": [],
    "difficulties": [
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Do not modify the repository being analyzed.",
    "tags": [
      "git",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Run cleanly inside GitHub Actions without network access.",
    "tags": [
      "git",
      "ci",
      "automation"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The main check must finish in under 10 seconds for a medium repository.",
    "tags": [
      "git",
      "devtools",
      "code",
      "performance"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not execute analyzed source code.",
    "tags": [
      "code",
      "devtools",
      "parser",
      "security"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Treat all input files as untrusted.",
    "tags": [
      "parser",
      "files",
      "security",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Never evaluate input as code.",
    "tags": [
      "parser",
      "data",
      "security"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Parsing errors must include line and column information.",
    "tags": [
      "parser",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Support streaming input instead of loading everything into memory.",
    "tags": [
      "parser",
      "data",
      "files"
    ],
    "forbid": [],
    "difficulties": [
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Peak memory usage should stay below 64 MB for typical inputs.",
    "tags": [
      "system",
      "parser",
      "files",
      "performance"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not store raw request bodies by default.",
    "tags": [
      "api",
      "network",
      "privacy"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Redact secrets from logs automatically.",
    "tags": [
      "api",
      "network",
      "security",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Support a fully deterministic mock mode.",
    "tags": [
      "api",
      "network",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not make outbound network requests.",
    "tags": [
      "api",
      "network",
      "security"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The service must expose a /health endpoint.",
    "tags": [
      "backend",
      "api",
      "network"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "All API examples must also be available as curl commands.",
    "tags": [
      "api",
      "backend",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Use SQLite as the only persistent database.",
    "tags": [
      "database",
      "backend",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Database migrations must be reversible.",
    "tags": [
      "database",
      "backend"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Never modify the original database file; work on a copy or read-only connection.",
    "tags": [
      "database",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Every query must have an explain/preview option before execution.",
    "tags": [
      "database",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not require Docker.",
    "tags": [
      "backend",
      "devtools",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The whole project must run in Docker with one compose command.",
    "tags": [
      "backend",
      "api",
      "network"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "No framework-specific configuration magic; keep setup explicit.",
    "tags": [
      "backend",
      "web",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Every operation must be idempotent.",
    "tags": [
      "automation",
      "backend",
      "devtools"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The automation must support a --dry-run flag.",
    "tags": [
      "automation",
      "cli"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Avoid polling; react only to explicit local events.",
    "tags": [
      "automation",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not require accessibility permissions from the OS.",
    "tags": [
      "desktop",
      "productivity",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Store no raw keystrokes or clipboard contents.",
    "tags": [
      "productivity",
      "privacy",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Collect only aggregate statistics, never content.",
    "tags": [
      "productivity",
      "privacy",
      "data"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Everything must reset cleanly with a single Reset button.",
    "tags": [
      "web",
      "desktop",
      "app"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The app must remain useful with animations disabled.",
    "tags": [
      "visual",
      "frontend",
      "web"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not use canvas; build the visualization with DOM/SVG.",
    "tags": [
      "visual",
      "frontend",
      "web"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Do not use third-party charting libraries.",
    "tags": [
      "visual",
      "data",
      "frontend"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The visualization must still make sense in monochrome.",
    "tags": [
      "visual",
      "frontend"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The tool must provide a text-only fallback for every visualization.",
    "tags": [
      "visual",
      "data",
      "accessibility"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The project must fit into a single HTML file.",
    "tags": [
      "website",
      "web",
      "frontend"
    ],
    "forbid": [],
    "difficulties": [
      "beginner",
      "easy"
    ],
    "scopes": [
      "hour",
      "evening"
    ]
  },
  {
    "text": "The entire project must fit under 500 lines.",
    "tags": [
      "utility",
      "generator",
      "converter",
      "website"
    ],
    "forbid": [],
    "difficulties": [
      "beginner",
      "easy"
    ],
    "scopes": [
      "hour",
      "evening"
    ]
  },
  {
    "text": "No external fonts, icons, analytics, or CDNs.",
    "tags": [
      "web",
      "frontend",
      "website"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Use only the standard library.",
    "tags": [
      "cli",
      "system",
      "backend",
      "library"
    ],
    "forbid": [],
    "difficulties": [
      "medium",
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Include property-based or fuzz tests.",
    "tags": [
      "parser",
      "devtools",
      "security"
    ],
    "forbid": [],
    "difficulties": [
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Make the output stable enough for snapshot tests.",
    "tags": [
      "generator",
      "report",
      "devtools",
      "parser"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Support import/export so no data is trapped in the app.",
    "tags": [
      "app",
      "data",
      "productivity"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The project must have a documented threat model.",
    "tags": [
      "security",
      "privacy",
      "network"
    ],
    "forbid": [],
    "difficulties": [
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Never transmit filenames, paths, or repository names.",
    "tags": [
      "privacy",
      "files",
      "git"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Prefer read-only access everywhere possible.",
    "tags": [
      "security",
      "system",
      "files",
      "database"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "The embedded build may use less than 256 KB of RAM.",
    "tags": [
      "embedded",
      "hardware"
    ],
    "forbid": [],
    "difficulties": [
      "hard",
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "Do not allocate memory dynamically after startup.",
    "tags": [
      "embedded",
      "hardware"
    ],
    "forbid": [],
    "difficulties": [
      "insane"
    ],
    "scopes": []
  },
  {
    "text": "The network tool must not require packet-capture privileges.",
    "tags": [
      "network",
      "system"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Only connect to hosts explicitly provided by the user.",
    "tags": [
      "network",
      "security"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  },
  {
    "text": "Never scan IP ranges automatically.",
    "tags": [
      "network",
      "security"
    ],
    "forbid": [],
    "difficulties": [],
    "scopes": []
  }
];
