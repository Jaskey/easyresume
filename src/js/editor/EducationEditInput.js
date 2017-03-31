		//一段Project Fragment
		window.EducationEditInput = React.createClass({
				getDefaultProps:function(){
					return {
						onEducationChange:function(educationJSON){},
						json:{
							"university":"projectName",
							"studyType":"role",
							"major":"start date",
							"startDate":"start date",
							"endDate":"end date",
							"gpa":"frament summary",
							"scholarships":[],	
							"experiences":[]	
						}
					}
				},

				handleValueChange:function(jsonKey,value){
					var json = this.props.json;
					json[jsonKey]=value;
					this.props.onEducationChange(json);
				},

				//教育经历中所有数组输入框变化的事件回调
				handleArrayChange:function(jsonKey,index, value){
					var json = this.props.json;
                    if ( value==null ) {//删除
                        json[jsonKey].splice(index,1);
                        console.debug('[Education][handleArrayChange][delete]',jsonKey,index,value,json);
                    } else {
                        json[jsonKey][index] = value;
                    }
					this.props.onEducationChange(json);
				},

				render:function(){
						var self =this;
						var json = this.props.json;
						return (
							<div className="block-wrapper">								
								<div className="input-wrapper">						
										<StringInput 
											label="学校名称"
											jsonKey="university"
											value={json.university} 
											onValueChange={this.handleValueChange}
											/>
										<StringInput 
											label="学历"
											jsonKey="studyType"
											value={json.studyType} 
											onValueChange={this.handleValueChange}
											/>

										<StringInput 
											label="专业"
											jsonKey="major"
											value={json.major} 
											onValueChange={this.handleValueChange}
											/>

										<StringInput 
											label="绩点"
											jsonKey="gpa"
											value={json.gpa} 
											onValueChange={this.handleValueChange}
											/>

										<StringInput 
											label={'开始日期'}
											jsonKey={'startDate'}  
											value={json.startDate} 
											onValueChange={this.handleValueChange}
											/>


										<StringInput 
											label={'结束日期'}
											jsonKey={'endDate'}  
											value={json.endDate} 
											onValueChange={this.handleValueChange}
											/>																					

										<ArrayInput 
											label={'奖学金'}
											jsonKey={'scholarships'}  
											values={json.scholarships} 
											onValueChange={this.handleArrayChange}
											/>	

										<ArrayInput 
											label={'在校经历'}
											jsonKey={'experiences'}  
											values={json.experiences} 
											onValueChange={this.handleArrayChange}
											/>
								</div>
							</div>
						)

				}
			}
		)