const Avatar = ({ url }) => {
  return (
    <div>
      <img
        src={url}
        alt="avatar"
        width={100}
        height={100}
      />
    </div>
  )
}

export default Avatar