
		//一个输入字符串的input
		window.StringInput = React.createClass({
				getDefaultProps:function(){
					return {
						label:"Label",
						jsonKey:"key",
						value:"",
						editor:null,//所属的面板组件

						//input的值变化后的回调函数
						onValueChange:function(jsonKey,value){
							console.log('[onValueChange]',jsonKey,value);
						}
					}
				},
				handleInputChange:function(event){
					var value = event.target.value;
					var jsonkey = this.props.jsonKey;
					this.props.onValueChange(jsonkey,value);
				},
				render:function(){
					//console.log('[StringInput][Render],state = ',this.state);
					return (
						<div className="input-wrapper" 	>								
							<div>
								<div className="label">{this.props.label}</div>
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