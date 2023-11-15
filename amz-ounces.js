[price, el] = [100.00, '']
Array.from(document.querySelectorAll('*'))
  .filter(e => e.textContent.includes('/Ounce'))
  .forEach(e => {
    const match = e.innerText.match(/\(\$([\d.]+)\/Ounce\)/)
    if (!match) {
      return
    }
    if (price > parseFloat(match[1])) {
      [price, el] = [parseFloat(match[1]), e]
    }
  })
console.log("best price:", price)
console.log("element:", el)
