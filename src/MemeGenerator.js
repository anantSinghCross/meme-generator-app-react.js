import React from "react"
import styles from "./styles.module.css"
import htmlToImage from "html-to-image"
import download from "download"

class MemeGenerator extends React.Component{
    
    constructor(){
        super()
        this.state ={
            topText:"Top Text",
            bottomText:"Bottom Text",
            randomImage:"https://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleGenerate = this.handleGenerate.bind(this)
    }
    
    handleGenerate(event){
        // console.log("a")
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        // console.log(randNum)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImage:randMemeImg
        })
    }
    
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleDownload(event){
        event.preventDefault()
        htmlToImage.toJpeg(document.getElementById("canvasObj"), {quality:1.00})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = "meme.jpg"
                link.href = dataUrl
                link.click()
            })
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                // console.log(memes[0])
                this.setState({allMemeImgs: memes })
            })
    }
    
    render(){
        // console.log(this.state.topText)
        return(
            <div className={styles.formContainer} id = "bigdiv">
                <form>
                    <input 
                        type="text" 
                        name="topText"
                        placeholder="Top Text" 
                        value={this.state.topText}
                        onChange={this.handleChange}/><br/>
                        
                    <input 
                        type="text" 
                        name="bottomText" 
                        placeholder="Bottom Text" 
                        onChange={this.handleChange}
                        value={this.state.bottomText}/><br/><br/>
                        
                    <button onClick={this.handleGenerate}>Randomize</button>
                    <button onClick={this.handleDownload}>Download JPG</button>
                </form>
                <br/>
                <div className={styles.meme}>
                    <div id="canvasObj">
                        <img src={this.state.randomImage} alt="" />
                        <h2 className={styles.topText}>{this.state.topText}</h2>
                        <h2 className={styles.bottomText}>{this.state.bottomText}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeGenerator