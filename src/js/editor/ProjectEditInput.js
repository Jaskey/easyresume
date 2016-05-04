		//一段Project Fragment
		window.ProjectEditInput = React.createClass({
				getDefaultProps:function(){
					return {
						onProjectChange:function(projectJSON){},
						json:{
							"projectName":"projectName",
							"role":"role",
							"startDate":"start date",
							"endDate":"end date",
							"summary":"frament summary",
							"details":[]	
						}
					}
				},

				handleValueChange:function(jsonKey,value){
					var json = this.props.json;
					json[jsonKey]=value;
					this.props.onProjectChange(json);
				},

				handleDetailsChange:function(jsonKey,index, value){
					var json = this.props.json;
					json[jsonKey][index]=value;
					this.props.onProjectChange(json);
				},

				render:function(){
						var self =this;
						var json = this.props.json;
						return (
							<div className="block-wrapper">								
								<div className="input-wrapper">						
										<StringInput 
											label="项目名称"
											jsonKey="projectName"
											value={json.projectName} 
											onValueChange={this.handleValueChange}
											/>
										<StringInput 
											label="担任角色"
											jsonKey="role"
											value={json.role} 
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