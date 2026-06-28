# Pig Game 🎲

A beautiful, interactive, and responsive implementation of the classic **Pig Game** built entirely using native frontend web technologies. It features dynamic custom 3D-shaded CSS dice faces, transition-state animations, live logic logging, and a special score-theft mechanic.

## 🚀 Game Rules

This version of Pig Game features two active players competing to reach a total of **100 points**.

1. **Roll Dice:** Accumulate points in your current **Turn Score**. You can roll as many times as you want.
2. **Hold:** Lock in your accumulated Turn Score, committing it to your **Total Score**, and pass the turn to the other player.
3. **The Roll-1 Penalty (Special Twist):**
   - If a player rolls a **1**, they lose **all** points (their entire Total Score resets to 0, along with their tentative Turn Score).
   - All of those lost points (Total Score + active Turn Score) are immediately transferred and added to the opponent's Total Score!
   - If transferring these points brings the opponent's score to **100** or more, the opponent wins immediately. Otherwise, the turn passes to them.
4. **Winning:** The first player to reach or exceed **100** total points (either by holding points or through an automatic point transfer when the opponent rolls a 1) wins the game!

---

## 🛠️ Technologies Used

This project is built from scratch with pure, zero-dependency software stack:

- **HTML5 (HyperText Markup Language):** Structuring the game's semantics, incorporating accessibility landmarks, modular sections, action triggers, and responsive container blocks.
- **CSS3 (Cascading Style Sheets) with Modern Features:**
  - **CSS Flexbox & Grid:** Used for dual-column desktop structures, central alignments of controls, and a precise 3x3 layout rendering dynamic dice dots.
  - **Dynamic Backdrop Filters (`backdrop-filter`):** Delivers a stunning frosted-glass morphism theme on high-definition displays.
  - **Keyframes Animations:** Implements visceral dice roll rotations, shake behaviors, and pulsated score loss warnings.
  - **Responsive Media Queries:** Features tailored breakpoints optimizing ergonomics, alignments, and aspect ratios dynamically between micro-screens, tablets, and 4K desktop screens.
- **Vanilla ES6+ JavaScript (Native Logic):**
  - **DOM Manipulation & Traversal:** High performance selection of elements without heavy libraries.
  - **State Engine Management:** Real-time tracking of active players, round states, total scores, and status flags using lean data primitives.
  - **Timed Asynchronous Events (`setTimeout`):** Used to disable controls securely during dice-roll animation cycles before executing calculations and updating the DOM layout.
  - **Pure SVG-like CSS Generation:** Programmatically crafts HTML-based dice orientations using multi-point coordinate sets on-fly.
- **Google Fonts:** Integration of the _Nunito_ typeface for modern, clean, and extremely legible game typography.

---

## 📁 Project Structure

The project has a lightweight structure:

- [index.html](index.html) - Structured document containing the two-player boards, dynamic dice viewports, control buttons, action logging blocks, and rules section.
- [style.css](style.css) - Comprehensive styling file mapping core variables, responsive positioning rules, animations, and game board aesthetics.
- [app.js](app.js) - Complete state controller containing modular score calculation workflows and event handling hooks.

---

## 🎯 How to Run Locally

Since this game is built entirely using native, vanilla web technologies, starting the game requires zero compilation, package management, or local server overhead:

1. Clone or download this project workspace to your local system.
2. Locate the file [index.html](index.html) inside your explorer or directory.
3. Double-click the file to open it directly inside any modern web browser (Edge, Chrome, Safari, Firefox).
4. 🎉 Start rolling!
