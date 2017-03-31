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

				//update the editor json, then update resume json
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
                    console.debug("before change project ,projectIndex = ",projectIndex,json);
                    json.projectExperiences[projectIndex]= projectJSON;
					this.updateStateJSON(json);
				},

                handleProjectDelete:function(projectIndex){
                    var json = this.getEditorJSON();
                    var newJSON = jQuery.extend(true,{},json)
                    newJSON.projectExperiences.splice(projectIndex, 1);
                    this.updateStateJSON(newJSON);
                },

				//教育经历更改
				handleEducationChange:function(educationIndex,educationJSON){
					var json = this.getEditorJSON();
					json.educations[educationIndex]= educationJSON;
					this.updateStateJSON(json);
				},

				//自定义模块update
				handleSectionsChange: function(sectionIndex,sectionJSON){
					var json = this.getEditorJSON();
					if (sectionJSON == null){//删除
                        console.debug("[handleSectionsChange][delete],",sectionIndex);
                        json['sections'].splice(sectionIndex,1);
                    }else {
                        json['sections'][sectionIndex] = sectionJSON;
                    }
					this.updateStateJSON(json);
				},


                /*START : WORK*/
                //工作的普通信息更新
                hanldeWorkInfoChange:function(workIndex,jsonKey,value){
                    var json = this.getEditorJSON();
                    json.workExperiences[workIndex][jsonKey] = value;
                    this.updateStateJSON(json);
                },

                //删除一段工作经历
                handleWorkFragmentDelete:function(workIndex){
                    var json = $.extend(true,{},this.getEditorJSON());
                    json.workExperiences.splice(workIndex, 1);
                    this.updateStateJSON(json);
                },

                //工作经历的details详情更新
                handleWorkDetailChange:function(workIndex,i,value){
                    var json = this.getEditorJSON();
                    if (value==null) {//删除
                        json.workExperiences[workIndex]['details'].splice(i,1);
                        console.debug('[hanldeWorkDetailChange][delete]',workIndex,i,value,json);
                    } else {
                        json.workExperiences[workIndex]['details'][i] = value;
                        console.debug('[hanldeWorkDetailChange][update]',workIndex,i,value,json);
                    }
                    this.updateStateJSON(json);
                },
                /*END : WORK*/


				//o= jsonkey对应的对象，被merge过去更新resume
				// updateJSONAndPreview :function(o){
				// 	if(typeof o === "function"){//是函数，执行函数
				// 		var f = o;
				// 		f.apply(this,Array.prototype.slice.call(arguments,1));//函数调用，绑定到editor 的this
				// 	}
				// 	else{//传入的是对象
				// 		var json = $.extend(true,this.getEditorJSON(),o);
				// 		this.setState(json,function(){
				// 			ReactDOM.render(<div><Resume  json={json}/></div>,document.getElementById('container'))
				// 		});
				// 	}
				// },

				getEditorJSON:function(){
					var clone = {};
                    jQuery.extend(true,clone,this.state.json);
					return clone;
				},
				
				handleDownload:function(event){
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

				//add one exeperience under one custom sections
				handleAddCustomSection: function(sectionKey, event){
					var state = this.state;
					let emptySectionConfig = buildDefaultConfigJSON(sectionKey);
					console.log('[handleAddCustomSection][emptySectionConfig]',emptySectionConfig);
					state.json[sectionKey].push(emptySectionConfig);//增加一段模块
					this.updateStateJSON(state.json)
				},

				componentDidMount:function(){
				},

				render:function(){
				    console.log("rending editor, this.json = ",this.state.json);
					var self = this;
					return (
							<div id="editor" ref="editor">
								<div className="download">
									<div id="downloadBtn" title="点击下载JSON配置到本地" onClick={this.handleDownload}></div>
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
											
											let onValueChange = function(workIndex){
												return function(jsonKey,value){
														self.hanldeWorkInfoChange(workIndex,jsonKey,value)
													}
											}(i);

											let onDetailChange = function(workIndex){
												return function(i,value){
														self.handleWorkDetailChange(workIndex,i,value)
													}
											}(i);

                                            let onWorkDelete = function(workIndex){
                                                return function(workIndex) {
                                                    self.handleWorkFragmentDelete(workIndex);
                                                }
                                            }(i);


											return <div className = "fragmentBlock" key={"work-"+i}>
                                                        <WorkEditInput index={i} jsonKey="workExperiences" editor={self}
														json={json}
														onValueChange={onValueChange}
														onDetailChange={onDetailChange}
														/>
                                                        <a href = "#" className="deleteFragment" title={"点击删除["+json.company+"]的工作经历"} onClick = {onWorkDelete}>delete</a>
                                                    </div>

										})
									}

									<a href="#" className="add-fragment" onClick={this.handleAddCustomSection.bind(self,"workExperiences")}>
										添加一段工作经历
									</a>

								</div>

								{/*项目经历*/}
								<div id="editProjectExperiences" className="edit-section" jsonKey="projectExperiences">
									<div className="header">项目经历</div>
									{
										this.state.json.projectExperiences.map(function(json,projectIndex){

											let onProjectChange = function(projectIndex){
												return function(projectJSON){
														return self.handleProjectChange(projectIndex,projectJSON);
													}
											}(projectIndex);

                                            let onProjectDelete = function(projectIndex){
                                                 return function () {
                                                     self.handleProjectDelete(projectIndex)
                                                 }
                                            }(projectIndex);

											return 	<div className = "fragmentBlock"  key={"project-"+projectIndex}>
                                                        <ProjectEditInput
                                                            index={projectIndex}
                                                            json={json}
                                                            onProjectChange={onProjectChange}
														    />
                                                        <a href = "#" className="deleteFragment" title={"点击删除项目["+json.projectName+"]"}onClick = {onProjectDelete}>delete</a>
                                                    </div>

                                            })
									}
									<a href="#" title="点击添加一个项目经历" className="add-fragment" onClick={this.handleAddCustomSection.bind(self,"projectExperiences")}>
										添加一个项目
									</a>									
								</div>

								{/*自定义模块*/}
								<div id="customSections" className="edit-section" jsonKey="sections">
									<EditSections jsons={self.getEditorJSON().sections}
										onSectionsChange={self.handleSectionsChange}/>
									<a href="#" className="add" onClick={this.handleAddCustomSection.bind(self,"sections")}>
										添加一段自定义模块
									</a>	
								</div>

								{/*教育经历*/}
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

									<a href="#" className="add" onClick={this.handleAddCustomSection.bind(self,"educations")}>
										添加一段教育经历
									</a>									
								</div>

							</div> 

						)
				}
			}
		);

        //增加一个模块的时候，默认的配置
		function buildDefaultConfigJSON(jsonKey) {
			switch (jsonKey) {
				case "workExperiences" :
					return jQuery.extend(true,{},Work.emptyJSON,{"company":"新公司",details:["",""]});
				case "projectExperiences":
					return jQuery.extend(true,{},ProjectExperience.emptyJSON,{"projectName":"新项目",details:["",""]});
				case "educations":
					return jQuery.extend(true,{},Educations.emptyJSON,{"university":"新大学","experiences":[""]});
				case "sections":
					return jQuery.extend(true,{},Section.emptyJSON,{title:"新建模块",fragments:[Fragment.emptyJSON]});
			}
		}