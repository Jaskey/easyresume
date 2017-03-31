
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

				//输入框增加一行
				handleAddRow: function(event){
                    this.props.onValueChange(this.props.jsonKey,this.props.values.length,"");
                },

                handleDeleteRow: function(event){
                    this.props.onValueChange(this.props.jsonKey,this.props.values.length-1,undefined);
                },

				render:function(){
					var self = this;
					var props = this.props;
					var values = this.props.values; //
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
								<div className="btn-add" title="点击添加一行" onClick={self.handleAddRow}></div>
								<div className="btn-delete" title="点击删除一行" onClick={self.handleDeleteRow}></div>


						</div>
					)
				}
		});
