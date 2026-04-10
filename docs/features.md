[日本語版はこちら (Japanese)](./features.ja.md)

# Feature Details

## Adding Nodes

| Type | Description |
|---|---|
| **Person** | Add with name, role (Suspect / Victim / Person of Interest / Witness), photo, and description |
| **Evidence** | Add with name, type (Physical / Photo / Video / Document / Weapon / DNA / Fingerprint), image, and description |
| **Memo** | Add with title and comment text |

## Canvas Controls

| Action | Method |
|---|---|
| Move a node | Drag and drop |
| Connect nodes | Drag from a handle dot on one node to a handle dot on another (direction shown by arrow) |
| Reconnect a line | Drag the end of an existing line to a different node's handle (label and arrow settings are preserved) |
| Set relationship label | Double-click a connection line → choose from presets (Accomplice / Acquaintance / Witnessed, etc.) or enter free text |
| Change arrow direction | Double-click a connection line → select "→ Forward", "← Reverse", "↔ Both", or "― None" |
| Edit a node | Double-click a node → modify name, role, photo, description |
| Multi-select | Shift + click |
| Delete selected | Press Delete key, or click the "Delete Selected" button at top-right |
| Zoom | Mouse wheel |
| Pan (scroll) | Drag on empty canvas area |
| Fit to view | Click the "Fit view" button in the bottom-left controls |
| Minimap | Overview in bottom-right corner (Person = blue, Evidence = yellow, Memo = gray) |

## Person Card Color Coding

| Role | Color |
|---|---|
| Suspect | Red |
| Victim | Blue |
| Person of Interest | Yellow |
| Witness | Green |

## Auto Image Compression

Photos are automatically processed when added to the board:

| Item | Detail |
|---|---|
| Resize | Max 800x800 pixels (card display is 180px wide, so quality is sufficient) |
| Format | Re-encoded as JPEG at 80% quality |
| Compressed size | Approximately 50–100 KB per image |

This means high-resolution photos from smartphones or cameras (3–10 MB) can be added without slowing down the board or inflating save file sizes. Even with around 100 photos, save files stay under approximately 10 MB.

## Data Management

| Action | Description |
|---|---|
| Save | Download the board state as a JSON file (includes photo data) |
| Load | Restore a board from a previously saved JSON file |
| Clear | Delete all board content (with confirmation dialog) |

## Multilingual Support

- Switch between Japanese and English via the JA / EN button in the sidebar
- Automatically detects browser language to set the initial display language
- Language preference is saved to localStorage and persisted across sessions
