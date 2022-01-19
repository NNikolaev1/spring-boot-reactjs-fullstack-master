import React, {Component} from 'react';
import QRCode from 'qrcode.react'
import {Button} from "react-bootstrap";

class QRCodeGeneration extends Component {
    constructor(props) {
        super(props);
    }

    downloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCodeEl')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    render() {
        return (
            <div className="App">
                <QRCode
                    id="qrCodeEl"
                    size={150}
                    value={this.props.id.toString()}
                />
                 <br/>
                 <Button variant="primary"
                         onClick={this.downloadQRCode}>
                     Download
                 </Button>
            </div>
        );
    }
}

export default QRCodeGeneration;
