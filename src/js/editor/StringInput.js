
		//一个输入字符串的input
		window.StringInput = React.createClass({
				getDefaultProps:function(){
					return {
						label:"",
						jsonKey:"key",
						value:"",
						editor:null,//所属的面板组件
						className:"",//需要传进来的class
						//input的值变化后的回调函数
						onValueChange:function(jsonKey,value){
							console.log('[onValueChange][default]',jsonKey,value);
						}
					}
				},
				getInitialState:function(){
					return this.props;
				},
				handleInputChange:function(event){
					var value = event.target.value;
					var jsonkey = this.props.jsonKey;
					this.setState({
						value: value
					});
					this.props.onValueChange(jsonkey,value);
				},
				render:function(){
					//console.log('[StringInput][Render],state = ',this.state);
					return (
						<div className="input-wrapper" 	>
							<div>
								{ this.state.label? <div className="label">{this.state.label}</div> :<div className="emptyNode"></div>}
								<input type="text"
									ref="inputBox"
									value={this.state.value}
									onChange={this.handleInputChange}
								/>
							</div>
						</div>
						)
				}
		});