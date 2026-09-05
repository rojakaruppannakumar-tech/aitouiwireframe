import html2canvas from 'html2canvas';

export const exportToJson = (mockupData) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(mockupData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${mockupData.page?.name || 'ui-mockup'}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportToHtmlCss = (mockupData) => {
  const { page, components } = mockupData;
  
  const componentsHtml = components.map((comp) => {
    const style = `position: absolute; left: ${comp.x}px; top: ${comp.y}px; width: ${comp.width}px; height: ${comp.height}px; background-color: ${comp.bgColor || 'transparent'}; color: ${comp.textColor || '#000000'}; font-size: ${comp.fontSize || 16}px; border-radius: 6px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: sans-serif;`;

    switch (comp.type) {
      case 'heading':
        return `    <h2 style="${style}">${comp.text || 'Heading'}</h2>`;
      case 'paragraph':
        return `    <p style="${style} align-items: flex-start; padding: 8px;">${comp.text || 'Paragraph text'}</p>`;
      case 'button':
        return `    <button style="${style} border: none; font-weight: bold; cursor: pointer;">${comp.text || 'Button'}</button>`;
      case 'input':
        return `    <input type="text" placeholder="${comp.placeholder || ''}" value="${comp.text || ''}" style="${style} border: 1px solid #ccc; padding: 0 12px;" />`;
      case 'card':
        return `    <div style="${style} border: 1px solid #e2e8f0; background: ${comp.bgColor || '#ffffff'}; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">${comp.text || ''}</div>`;
      case 'image':
        return `    <div style="${style} background: #e2e8f0; border: 2px dashed #cbd5e1; display:flex; flex-direction:column; justify-content:center; align-items:center; color:#64748b;">📷 Image Placeholder</div>`;
      case 'checkbox':
        return `    <label style="${style} display: flex; gap: 8px; justify-content: flex-start;"><input type="checkbox" /> <span>${comp.text || 'Checkbox'}</span></label>`;
      default:
        return `    <div style="${style} border: 1px dashed #aaa;">${comp.text || comp.type}</div>`;
    }
  }).join('\n');

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page?.name || 'Generated UI'}</title>
  <style>
    body { margin: 0; padding: 20px; background-color: #f1f5f9; display: flex; justify-content: center; }
    .canvas { position: relative; width: ${page?.width || 1000}px; height: ${page?.height || 700}px; background-color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; }
  </style>
</head>
<body>
  <div class="canvas">
${componentsHtml}
  </div>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', `${page?.name || 'mockup'}.html`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
};

export const exportToPng = async (canvasRef) => {
  if (!canvasRef.current) return;
  const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
  const image = canvas.toDataURL('image/png');
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', image);
  downloadAnchor.setAttribute('download', 'ui-mockup.png');
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};