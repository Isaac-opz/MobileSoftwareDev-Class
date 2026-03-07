function PerfilUsuario({ usuario }) {
  if (usuario.avatar) {
    return (
      <img
        src={usuario.avatar}
        alt="avatar"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    )
  }

  const letra = usuario.email.charAt(0).toUpperCase()

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#888',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        fontWeight: 'bold'
      }}
    >
      {letra}
    </div>
  )
}

export default PerfilUsuario
