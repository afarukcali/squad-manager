import html2canvas from 'html2canvas-pro'

export async function captureElementAsPng(element: HTMLElement, fileName: string) {
  const canvas = await html2canvas(element, {
    backgroundColor: '#070b10',
    scale: 2,
    useCORS: true,
    logging: false,
  })

  const link = document.createElement('a')
  link.download = fileName
  link.href = canvas.toDataURL('image/png')
  link.click()
}
