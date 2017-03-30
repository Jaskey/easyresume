		//一段工作经历
		window.WorkEditInput = React.createClass({
				getDefaultProps:function(){
					return {
						index:0,
						jsonKey:'workExperiences',
						json: {},
						editor:null,//所属的面板组件,用于获取整体配置并更新
						onDetailChange:function(index,value){},
						onValueChange:function(jsonKey,value){}
					}
				},

				_handleDetailInputChange: function(jsonKey,i,value){
					this.props.onDetailChange(i,value);
				},
				
				_handleStringInputChange :function(jsonKey,value){
					this.props.onValueChange(jsonKey,value);
				},


				render:function(){
					var self = this;
					var json = jQuery.extend({}, Work.emptyJSON);//default it is empty,
					jQuery.extend(json, this.props.json);//merge the config json
					return (
						<div>								
							<div className="block-wrapper">
									<StringInput jsonKey="company" editor={this.props.editor} label="公司" value={json.company}
										index = {this.props.index}
										workComponent = {this}
										onValueChange={this._handleStringInputChange}
										/>
									<StringInput jsonKey="post" editor={this.props.editor} label="职位" value={json.post}
										index = {this.props.index}
										workComponent = {this}
										onValueChange={this._handleStringInputChange}
									/>
									<StringInput jsonKey="startDate" editor={this.props.editor} label="开始日期" value={json.startDate}
										index = {this.props.index}
										workComponent = {this}
										onValueChange={this._handleStringInputChange}
									/>
									<StringInput jsonKey="endDate" editor={this.props.editor} label="结束日期" value={json.endDate}
										index = {this.props.index}
										workComponent = {this}
										onValueChange={this._handleStringInputChange}
									/>
									<StringInput jsonKey="summary" editor={this.props.editor} label="工作概述" value={json.summary}
										index = {this.props.index}
										workComponent = {this}
										onValueChange={this._handleStringInputChange}
									/>

									<ArrayInput jsonKey="details" 
										label="工作详情" 
										workComponent = {this}
										values={json.details} 
										workIndex={this.props.index}
										onValueChange={this._handleDetailInputChange}
									/>
							</div>
						</div>
					)
				}
		});

