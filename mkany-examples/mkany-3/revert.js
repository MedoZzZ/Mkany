import fs from 'fs';
let code = fs.readFileSync('src/components/HubScreen.tsx', 'utf8');

code = code.replace(/var\(--hub-bg\)/g, '#F4F5F0');
code = code.replace(/var\(--hub-surface\)/g, '#FFFFFF');
code = code.replace(/var\(--hub-text-primary\)/g, '#0B1B2B');
code = code.replace(/var\(--hub-text-muted\)/g, '#5A6B7C');
code = code.replace(/var\(--hub-accent\)/g, '#E6AC00');
code = code.replace(/var\(--shadow-hub-card\)/g, '0 24px 48px rgba(11, 27, 43, 0.08)');
code = code.replace(/var\(--radius-hub-card\)/g, '24px');

fs.writeFileSync('src/components/HubScreen.tsx', code);
