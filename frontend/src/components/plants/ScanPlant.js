import React, {Component} from 'react';
import QrReader from 'react-qr-reader'

class ScanPlant extends Component {
    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={this.handleError}
                    onScan={this.props.handleScan}
                    style={{width: '100%'}}
                />
            </div>
        )
    }
}

export default ScanPlant