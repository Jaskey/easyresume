
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



				handleInputChange:function(index,event){
					var value = event.target.value;
					var index = index;
					var jsonkey = this.props.jsonKey;
					this.props.onValueChange(jsonkey,index,value);
				},
				render:function(){
					var self = this;
					//var prop = this.getProps();
					var props = this.props;
					return (
						<div className="input-wrapper array-wrapper">								
								<div className="label">{this.props.label}</div>
								<div className="array-input">
								{
									props.values.map(function(e,i){
										return 	(	
											<div 
												key={"array_"+self.props.jsonKey+i}>						
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


						</div>
					)
				}
		});
