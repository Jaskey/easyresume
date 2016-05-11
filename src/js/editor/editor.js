		//左边的编辑版
		window.Editor = React.createClass({
				getDefaultProps:function(){
					return {
						json:{}
					}
				},
				getInitialState:function(){//state默认等于props
					return {
						json:this.props.json
					}
				},

				updateStateJSON:function(json){
					this.setState({json:json},function(){
						this.updateResume(json);
					});
				},
				updateResume:function(json){
					ReactDOM.render(<div><Resume  json={json}/></div>,document.getElementById('container'))
				},

				handleInfoChange:function(jsonKey, value){
					var json = this.getEditorJSON();
					json[jsonKey] = value;
					this.updateStateJSON(json);
				},

				handleSummaryChange:function(jsonKey,index ,value){
					var json = this.getEditorJSON();
					json[jsonKey][index] = value;
					this.updateStateJSON(json);
				},

				//项目经历更改
				handleProjectChange:function(projectIndex,projectJSON){
					var json = this.getEditorJSON();
					json.projectExperiences[projectIndex]= projectJSON;
					this.updateStateJSON(json);
				},

				//教育经历更改
				handleEducationChange:function(educationIndex,educationJSON){
					var json = this.getEditorJSON();
					json.educations[educationIndex]= educationJSON;
					this.updateStateJSON(json);
				},

				hanldeWorkInfoChange:function(workIndex,jsonKey,value){
					var json = this.getEditorJSON();
					json.workExperiences[workIndex][jsonKey] = value;
					this.updateStateJSON(json);						
				},

				hanldeWorkDetailChange:function(workIndex,i,value){
					//console.log('hanldeWorkDetailChange',workIndex,i,value);
					var json = this.getEditorJSON();
					json.workExperiences[workIndex]['details'][i] = value;
					this.updateStateJSON(json);
				},

				handleSectionsChange: function(sectionIndex,sectionJSON){
					var json = this.getEditorJSON();
					json['sections'][sectionIndex] = sectionJSON;
					this.updateStateJSON(json);
				},

				//o= jsonkey对应的对象，被merge过去更新resume
				updateJSONAndPreview :function(o){
					if(typeof o === "function"){//是函数，执行函数
						var f = o;
						f.apply(this,Array.prototype.slice.call(arguments,1));//函数调用，绑定到editor 的this
					}
					else{//传入的是对象
						var json = $.extend(true,this.getEditorJSON(),o);
						this.setState(json,function(){
							ReactDOM.render(<div><Resume  json={json}/></div>,document.getElementById('container'))
						});
					}
				},

				getEditorJSON:function(){
					return this.state.json;
				},
				
				handleDownload:function(event){
					console.log('handleDownload');
					var json = this.getEditorJSON();

					var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json,0,4));
					var a = document.createElement('a');
					a.href = 'data:' + data;
					a.download = 'resume.json';
					a.innerHTML = 'download JSON';

					var container = document.getElementById('container');
					container.appendChild(a);
					a.click();

					a.remove();
				},


				componentDidMount:function(){
				},

				render:function(){
					var self = this;


					return (
							<div id="editor" ref="editor">


								<div className="download">
									<button onClick={this.handleDownload}>下载JSON配置</button>
								</div>

								{/*个人信息*/}
								<div id="editInfo" className="edit-section">
									<div className="header">个人信息</div>
									<div className="block-wrapper">
										<StringInput jsonKey="name" editor={this} label="姓名" value={this.state.json.name} 
											onValueChange={self.handleInfoChange}/>
										<StringInput jsonKey="birth" editor={this} label="生日" value={this.state.json.birth}
											onValueChange={self.handleInfoChange}/>
										<StringInput jsonKey="email" editor={this} label="邮箱" value={this.state.json.email}
											onValueChange={self.handleInfoChange}/>							
										<StringInput jsonKey="tel"  editor={this} label="电话" value={this.state.json.tel}
											onValueChange={self.handleInfoChange}/>
										<StringInput jsonKey="blog" editor={this}  label="博客" value={this.state.json.blog}
											onValueChange={self.handleInfoChange}/>
										<StringInput jsonKey="avatar" editor={this}   label="头像" value={this.state.json.avatar}
											onValueChange={self.handleInfoChange}/>
									</div>

								</div>		
								
								{/*概览*/}
								<div id="editSummaries" className="edit-section">
									<div className="block-wrapper">
										<ArrayInput jsonKey="summaries" editor={this} label="概述" values={this.state.json.summaries}
											onValueChange ={self.handleSummaryChange}
										/>
									</div>
								</div>

								{/*工作经历*/}
								<div id="editWorkExperiences" className="edit-section" jsonKey="workExperiences">
									<div className="header">工作经历</div>
									{
										this.state.json.workExperiences.map(function(json,i){
											
											var onValueChange = function(workIndex){
												return function(jsonKey,value){
														self.hanldeWorkInfoChange(workIndex,jsonKey,value)
													}
											}(i);

											var onDetailChange = function(workIndex){
												return function(i,value){
														self.hanldeWorkDetailChange(workIndex,i,value)
													}
											}(i);


											return <WorkEditInput key={"work-"+i} index={i} jsonKey="workExperiences" editor={self} 
														json={json}
														onValueChange={onValueChange}
														onDetailChange={onDetailChange}
														/>
										})
									}
								</div>


								<div id="editProjectExperiences" className="edit-section" jsonKey="projectExperiences">
									<div className="header">项目经历</div>
									{
										this.state.json.projectExperiences.map(function(json,projectIndex){

											var onProjectChange = function(projectIndex){
												return function(projectJSON){
														return self.handleProjectChange(projectIndex,projectJSON);
													}
											}(projectIndex)

											return 	<ProjectEditInput 
														key={"project-"+projectIndex} 
														index={projectIndex}
														json={json}
														onProjectChange={onProjectChange}
														/>
													
										})
									}									
								</div>

								<EditSections jsons={self.getEditorJSON().sections}
									onSectionsChange={self.handleSectionsChange}/>


								<div id="editEducationExperiences" className="edit-education" jsonKey="educations">
									<div className="header">教育经历</div>
									{
										this.state.json.educations.map(function(json,eduIndex){

											var onEducationChange = function(eduIndex){
												return function(eduJSON){
														return self.handleEducationChange(eduIndex,eduJSON);
													}
											}(eduIndex)

											return <EducationEditInput 
														key={"education-"+eduIndex} 
														index={eduIndex}
														json={json}
														onEducationChange={onEducationChange}/>
										})
									}									
								</div>


							</div> 

						)
				}
			}
		);