		//一段Fragment
		window.FragmentEditInput = React.createClass({
				getDefaultProps:function(){
					return {
						onFragmentChange:function(framentJSON){},
						json:{
							"nameKey":"name",
							"name":"Frament Name",
							"nameLabel":'主标题',//这段编辑的header


							"commentKey":"comment",
							"comment":"Frament comment",
							"commentLabel":"副标题",//这个frament label的显示值

							"startDate":"start date",
							"endDate":"end date",
							"summary":"frament summary",
							"details":[]	
						}
					}
				},

				handleValueChange:function(jsonKey,value){
					console.log(jsonKey,value);
					var json = this.props.json;
					json[jsonKey]=value;
					this.props.onFragmentChange(json);
				},

				handleDetailsChange:function(jsonKey,index, value){
					var json = this.props.json;
                    if ( value==null ) {//删除
                        json[jsonKey].splice(index,1);
                        console.debug('[CustomFragment][handleDetailsChange][delete]',index,value,json);
                    } else {
                        json[jsonKey][index] = value;
                    }
					this.props.onFragmentChange(json);
				},

				render:function(){
						var self =this;
						var json = this.props.json;
						return (
							<div className="block-wrapper">								
								<div className="input-wrapper">						
										<StringInput 
											label={json.nameLabel||'主标题'}
											jsonKey={json.nameKey||'name'}  
											value={json.name} 
											onValueChange={this.handleValueChange}
											/>
										<StringInput 
											label={json.commentLabel||'副标题'}
											jsonKey={json.commentKey||'comment'}  
											value={json.comment} 
											onValueChange={this.handleValueChange}
											/>

										<StringInput 
											label={'start date'}
											jsonKey={'startDate'}  
											value={json.startDate} 
											onValueChange={this.handleValueChange}
											/>


										<StringInput 
											label={'end date'}
											jsonKey={'endDate'}  
											value={json.endDate} 
											onValueChange={this.handleValueChange}
											/>																					

										<StringInput 
											label={'summary'}
											jsonKey={'summary'}  
											value={json.summary} 
											onValueChange={this.handleValueChange}
											/>	


										<ArrayInput 
											label={'details'}
											jsonKey={'details'}  
											values={json.details} 
											onValueChange={this.handleDetailsChange}
											/>	
								</div>
							</div>
						)

				}
			}
		)