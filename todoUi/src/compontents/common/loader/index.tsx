import './loader.css'

const Loader = () => {

  return (
    /* From Uiverse.io by mobinkakei */ 
<div id="wifi-loader" className='mx-auto'>
    <svg className="circle-middle" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27"></circle>
        <circle className="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg className="circle-inner" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14"></circle>
        <circle className="front" cx="17" cy="17" r="14"></circle>
    </svg>
</div>
  )
}

export default Loader