
		//一个输入数组字符串的input
		window.ArrayInput = React.createClass({
				getDefaultProps:function(){
					return {
						label:"Label",//label
						jsonKey:"key",//配置中的key名字,
						values:[],
						editor:null,//所属的面板组件,用于获取整体配置并更新
						onValueChange:function(jsonKey,index, value){}
					}
				},

				getInitialState:function(){
					return this.props;
				},

				handleInputChange:function(index,event){
					var value = event.target.value;
					var index = index;
					var jsonkey = this.props.jsonKey;
					this.props.onValueChange(jsonkey,index,value);
				},

				//输入框增加一行
				handleAddRow: function(event){
					var state = this.state;
					state.values.push("");//增加一个空字符串，使得多一个输入框
					this.setState(state);
				},

				render:function(){
					var self = this;
					//var prop = this.getProps();
					//var props = this.props;
					var values = this.state.values; //
					return (
						<div className="input-wrapper array-wrapper">								
								<div className="label">{this.props.label}</div>
								<div className="array-input">
								{
									values.map(function(e,i){
										return 	(	
											<div 
												key={"array_"+self.props.jsonkeyKey+i}>						
												<input type="text"
													ref={"arrayBox"+i}
													index={i}
													value={e}
													onChange={self.handleInputChange.bind(self,i)}
												/>
											</div>
										)
									})
								}
								</div>
								<div className="btn-add" title="添加一行" onClick={self.handleAddRow}></div>


						</div>
					)
				}
		});
