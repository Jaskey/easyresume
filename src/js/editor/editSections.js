		window.EditSection = React.createClass({
				getDefaultProps:function(){
					return {
						json:{fragments:[]},
						onSectionChange:function(sectionJSON){}
					}
				},

				//列表fragment内容改变
				handlePointChange:function(jsonKey,pointIndex, value){
						var json = this.props.json;
						json.points[pointIndex]=value;
						this.props.onSectionChange(json);
				},

				//通用fragment内容改变
				handleFragmentChange:function(framentIndex,fragmentJSON){
					var json = this.props.json;
					json.fragments[framentIndex]=fragmentJSON;
					this.props.onSectionChange(json);//触发section change
				},


				render:function(){
					var self = this;
					var section = this.props.json;
					return (
							<div>
								<div className="header">{section.title}</div>
								{
									section.fragments
										?
										section.fragments.map(function(f,framentIndex){
											var onFragmentChange = function(framentIndex){
												return function(fragmentJSON){
													self.handleFragmentChange(framentIndex,fragmentJSON);
												}
											}(framentIndex);
									

											return <FragmentEditInput 
														key={"fragments-_"+framentIndex} 
														json={f}
														onFragmentChange={onFragmentChange}
													/>
										})
								
										:
										<div className="block-wrapper">
											<ArrayInput label="" jsonKey="points" values={section.points}
													onValueChange={this.handlePointChange}/>
										</div>
									
											
								}
							</div>
						)
				}

		});


		window.EditSections = React.createClass({
				getDefaultProps:function(){
					return {
						onSectionsChange:function(sectionIndex,newSection){},
						jsons:[]
					}
				},

				handleSectionsChange:function(sectionIndex,sectionJSON){
					this.props.onSectionsChange(sectionIndex,sectionJSON);	
				},

				render:function(){
						var sections = this.props.jsons;
						var self = this;
						console.log('[EditSections][render]sections:',sections);
						return(		
								<div id="editSections" className="edit-section" jsonKey="sections">
									{
										sections.map(function(section,i){
											var sectionIndex= i;
											
											var onSectionChange =  function(sectionIndex){
												return function(sectionJSON){
													self.handleSectionsChange(sectionIndex,sectionJSON);
												}
											}(sectionIndex);


											
											return 	<EditSection json={section} index={i}
													onSectionChange={onSectionChange}
													/>
										})
									}
								</div>	
						)
				}
			});