import { useState } from 'react'
import CryptoJS from 'crypto-js'
import './App.css'

function App() {
  const [clave, setClave] = useState('')
  const [textoPlano, setTextoPlano] = useState('')
  const [resultadoCifrado, setResultadoCifrado] = useState('')
  const [textoCifradoEntrada, setTextoCifradoEntrada] = useState('')
  const [resultadoDescifrado, setResultadoDescifrado] = useState('')

  const cifrarTexto = () => {
    if (!clave.trim() || !textoPlano.trim()) {
      alert('Ingresa la clave y el texto a cifrar')
      return
    }

    const cifrado = CryptoJS.AES.encrypt(textoPlano, clave).toString()
    setResultadoCifrado(cifrado)
  }

  const descifrarTexto = () => {
    if (!clave.trim() || !textoCifradoEntrada.trim()) {
      alert('Ingresa la clave y el texto cifrado a descifrar')
      return
    }

    try {
      const bytes = CryptoJS.AES.decrypt(textoCifradoEntrada, clave)
      const texto = bytes.toString(CryptoJS.enc.Utf8)

      if (!texto) {
        setResultadoDescifrado('No se pudo descifrar. Verifica la clave o el texto cifrado.')
        return
      }

      setResultadoDescifrado(texto)
    } catch (error) {
      setResultadoDescifrado('Error al descifrar el texto.')
    }
  }

  return (
    <div className="App">
      <div className="contenedor">
        <h1>Lab 3 - Cipher and Decipher</h1>

        <label>Texto secreto / clave:</label>
        <input
          type="text"
          placeholder="Ingresa la clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <label>Texto a cifrar:</label>
        <input
          type="text"
          placeholder="Escribe el texto plano"
          value={textoPlano}
          onChange={(e) => setTextoPlano(e.target.value)}
        />

        <button onClick={cifrarTexto}>Cifrar</button>

        <label>Resultado cifrado:</label>
        <textarea
          value={resultadoCifrado}
          readOnly
          placeholder="Aquí aparecerá el texto cifrado"
        />

        <label>Texto cifrado a descifrar:</label>
        <textarea
          placeholder="Pega aquí el texto cifrado"
          value={textoCifradoEntrada}
          onChange={(e) => setTextoCifradoEntrada(e.target.value)}
        />

        <button onClick={descifrarTexto}>Descifrar</button>

        <label>Resultado descifrado:</label>
        <textarea
          value={resultadoDescifrado}
          readOnly
          placeholder="Aquí aparecerá el texto original"
        />
      </div>
    </div>
  )
}

export default App