[日本語版はこちら (Japanese)](./README.ja.md)

# Sousa - Investigation Board

Sousa is a digital investigation board for police investigations.

Place photos of suspects, persons of interest, and evidence on a canvas, then connect them with lines to organize and visualize relationships.

Also known as: Evidence Board, Crazy Board, Link Board.

## Features

- Place **people, evidence, and memos** as cards on the canvas
- **Connect cards with arrows** and label the relationships
- Person cards are **color-coded by role** (Suspect / Victim / Person of Interest / Witness)
- **Auto image compression** (max 800x800px) keeps the board responsive even with many photos
- **Save and load** boards as JSON files
- **Japanese / English** language switching
- **Tauri** desktop app (exe) distribution support

See [docs/features.md](./docs/features.md) for detailed usage instructions.

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) + TypeScript | Frontend framework |
| [Vite](https://vite.dev/) | Build tool |
| [React Flow (@xyflow/react)](https://reactflow.dev/) | Canvas, node layout, and connections |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Tauri](https://tauri.app/) | Desktop app packaging |

## Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build

# Build Tauri desktop app
npm run tauri:build
```

After starting the dev server, open http://localhost:5173/ in your browser.

> **About the port:** The dev server is fixed to port `5173` (`strictPort: true`)
> to match Tauri's `devUrl` setting. If the port is already in use, the dev server will fail to start.
> The exe app built with `npm run tauri:build` does not use any port.
> Frontend assets are embedded in the binary and loaded via a custom protocol.

## License

This project is licensed under the [GNU Affero General Public License v3 (AGPL-3.0)](./LICENSE).

Modification and redistribution require disclosure of the modified source code under the same license.
