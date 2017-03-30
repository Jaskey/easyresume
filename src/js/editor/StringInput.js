//一个输入字符串的input
window.StringInput = React.createClass({
    getDefaultProps: function () {
        return {
            label: "",
            jsonKey: "key",
            value: "",
            editor: null,//所属的面板组件
            className: "",//需要传进来的class
            //input的值变化后的回调函数
            onValueChange: function (jsonKey, value) {
                console.log('[onValueChange][default]', jsonKey, value);
            }
        }
    },
    handleInputChange: function (event) {
        var value = event.target.value;
        var jsonkey = this.props.jsonKey;

        this.props.onValueChange(jsonkey, value);
    },
    render: function () {
        return (
            <div className="input-wrapper">
                <div>
                    { this.props.label ? <div className="label">{this.props.label}</div> :
                        <div className="emptyNode"></div>}
                    <input type="text"
                           ref="inputBox"
                           value={this.props.value}
                           onChange={this.handleInputChange}
                    />
                </div>
            </div>
        )
    }
});