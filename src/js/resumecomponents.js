function createMarkup(html) {
    return {__html: html};
}

/*定义所有简历显示的ReactJS组件*/
		window.Resume = React.createClass({
			getDefaultProps:function (){
				return {
					json:{}
				}
			},

			getInitialState:function(){
				console.debug('[Resume][getInitialState]');
				return {
					
				}
			},

			render:function(){

				var cSumary = <Summary key="summary-section" summaries = {this.props.json.summaries}/>;//概览模块
				var cWork = <Work key="work-section" workExperiences = {this.props.json.workExperiences}/>//工作模块
				var cProject = <ProjectExperience key="project-section" projectExperiences = {this.props.json.projectExperiences}/>//项目经验
				var cOtherSection = <OtherSections key="other-section" sections={this.props.json.sections}/>//其他模块
				var cCourse = <Course key="course-section" courses={this.props.json.courses}/>//课程
				var cEdu = <Educations key="education-section" educations={this.props.json.educations}/>;//教育经历
				
				var comps=[cSumary,cWork,cProject,cOtherSection,cCourse,cEdu];//组合起来成为一个大的component
				
				return (
					<div id="mainContent">
						<Info name={this.props.json.name} //姓名
							  birth={this.props.json.birth}//生日
							  email={this.props.json.email}//邮件
							  tel={this.props.json.tel}//电话
							  blog={this.props.json.blog}//博客
							  avatar={this.props.json.avatar}//头像
							  pages={this.props.json.pages}//个人主页的icon链接
							  />
						<div id="resumeContent">
							{/*简历主内容*/}
							{comps}
						</div>
						<div id="footer"><div id="credit">Powered by <a href="https://github.com/jaskey/easyresume/" target="_blank" >EasyResume</a></div></div>{/*水印*/}
					</div>
				)
			},
			
			componentDidMount:function(){
			}
		})
		
		var PageIcon=React.createClass(		
			function(){
				var iconfontKeymap = {
						"weixin": "&#xe603;",
						"zhihu": "&#xe607;",
						"douban": "&#xe605;",
						"github": "&#xe604;",
						"weibo": "&#xe601;",
						"stackoverflow": "&#xe600;",
						"segmentfault": "&#xe602;",
						"lofter": "&#xe608;",
						"linkedin": "&#xe606;"
				};
				return {
					getDefaultProps:function(){
						return {
							page:{}
						}
					},


					render:function(){
						var pageUrl;
						var pageIconFont;
						for( var key in this.props.page){
							pageUrl=this.props.page[key];
                            pageIconFont=iconfontKeymap[key.toLowerCase()];
                            break;
						}
						return (
						    <a ref="iconFontSpan" className="page-icon-font" href={pageUrl} target="_blank"
                               dangerouslySetInnerHTML={createMarkup(pageIconFont)}>{/*inner html是iconfont*/}
                            </a>
                        )
					},
					componentDidMount:function(){}
				}
			}());

		/*个人信息*/
		window.Info  = React.createClass({
			getDefaultProps:function(){
				return {
					name:null,
					birth:null,
					tel:null,
					email:null,
					blog:null,
					avatar:'/image/avatar.jpg',
					pages:[]
				}
			},
			render:function(){
				var aPages=[];
				for(var i = 0;i<this.props.pages.length;i++){
					var cPage = <PageIcon key={"page-icon"+i} page={this.props.pages[i]}/> ;	
					aPages.push(cPage);
				}
				return (
					<div className="info" >
						<div className="info-brief" >
							<div className="avatar"><img src={this.props.avatar}/></div>
							<div className="name">{this.props.name}</div>
							<div className="birth" ref="birth">{this.props.birth}</div>
							<div className="pages-link">
								{aPages}
							</div>
						</div>
						<div className="info-contact">
								<div>电话:{this.props.tel}</div>
								<div>邮件:{this.props.email}</div>
                                {this.props.blog? <span>博客:<span dangerouslySetInnerHTML={createMarkup(this.props.blog)}/></span>:null}{/*有博客则显示博客*/}
						</div>
					</div>
				)
			}
		});
		
		window.Summary = React.createClass({
			getDefaultProps:function(){
				return {
					summaries:[]
				}
			},			
			render:function(){
				var summaries = this.props.summaries||[];
				if(summaries.length===0) return false;

				var lis = [];
				for(var i=0;i<summaries.length;i++){
					lis.push(<li key={"summary-paragrph"+i}>{summaries[i]}</li>);
				};

				return (
								<div className="summary section">
									<h2 className="section-title">概述</h2>
									<div className="section-content">
										<ul>
											{lis}
										</ul>
									</div>
								</div>
						)
						
			}
				
		});
				


		//工作经历模块
		window.Work = React.createClass({
			getDefaultProps:function(){
				workExperiences:[]
			},
			
			render:function(){
				var ex=[];//工作经历components
				var workExperiences = this.props.workExperiences||[];
				
				for(var i =0;i<workExperiences.length;i++){
					var we = jQuery.extend({}, Work.emptyJSON);//default it is empty,
					jQuery.extend(we, workExperiences[i]);//merge the config json
					console.debug("工作经历we",we);
					var work = 
								<div key={"work-experience_"+i} className="work-Fragment">
									<div className="work-date">
										<div>{we.startDate}</div>
										<div className="date-separator"></div>
										<div>{we.endDate} </div>
									</div>
									
									<div className="companyLogo circle-point">
										{we.company[0]}
									</div>
										
									<div className="work-content">
										<h2>{we.company}</h2>
										<h3>{we.post}</h3>
										

										<div className="work-experience-content">
											{
												function(we){
													return we.summary?<div className="work-summary">{we.summary}</div>:null
												}(we)
											}
											<div className="work-detail">
												<ul>
													{
														we.details.map(function(e,i){return <li key={"work-detail_"+we.company+"_"+we.post+i}>{e}</li>})
													}
												</ul>
											</div>
										</div>

									</div>
								</div>;

					
					ex.push(work);
				}
			
				return(
					<div className="section work-experience">	
						<h3 className="section-title">工作经历</h3>
						<div className="section-content">{ex}</div>
					</div>
				)
			}
			
		});
		
		window.Work.emptyJSON = {
                    "company":"",
                    "post":"",
                    "startDate":"",
                    "endDate":"",
                    "summary":"",
                    "details":[
                        ""
                    ]       
        };

		
		window.ProjectExperience = React.createClass({
			getDefaultProps:function(){
				projectExperiences:[]
			},
			
			render:function(){
				var projectExperiences = this.props.projectExperiences||[];
				if(projectExperiences.length===0) return false;

				var ex=[];
				for(var i =0;i<projectExperiences.length;i++){
					var pe = projectExperiences[i]
					
					//一段项目经历Fragment的option
					var fragmentOption={
						name:pe.projectName,
						comment:pe.role,
						startDate:pe.startDate,
						endDate:pe.endDate,
						summary:pe.summary,
						details:pe.details
					}		
					
					var project = 
						<div key={"project-experience_"+i} className="project-Fragment">
							<Fragment option={fragmentOption}/>
						</div>;
					ex.push(project);
				}
			

				return (
					<div className=" section project-experience">
						<h3 className="section-title">项目经历</h3>
						<div className="timeline-section-content">{ex}</div>
					</div>
				)
			}
		});
		
		window.ProjectExperience.emptyJSON = {
                    "projectName":"",
                    "role":"",
                    "startDate":"",
                    "endDate":"",
                    "summary":"",
                    "details":[
                        ""
                    ]       
        };

		
		window.OtherSections = React.createClass({
			getDefaultProps:function(){
				return {
					sections:[]
				}
			},
			
			render:function(){
				var secComponents=[];//所有section 的components数组
				
				for(var i=0;i<this.props.sections.length;i++){
					var sec = this.props.sections[i];//一个section配置
					var secComponent=<Section key={"other-section_"+i} title={sec.title} fragments = {sec.fragments} points = {sec.points}/>//一个section component
					secComponents.push(secComponent);
				}
				return (
							<div className="common-sections">
								{secComponents}
							</div>
					)
			}
			
		});
		
		window.Course  =  React.createClass({
			getDefaultProps:function(){
				return {
					courses:[]
				}
			},
			
			render:function(){
				var courses = this.props.courses;
				var liElements = [];
				for(var i =0;i<courses.length;i++){
					var course = courses[i];
					var li=<div><span>{course.courseName}</span><span>{course.courseProvider}</span></div>
					liElements.push(li);
				}
			
				return (
					
					liElements.length>0?
						<div className="section course">
							<h2 className="section-title">MOOC证书</h2> 
							<div className="section-content">{liElements}</div>
						</div>
						:<div></div>
				)
			}
		});
		




		window.Educations = React.createClass({
		
			getDefaultProps:function(){
				return {
					educations:[{
						university:'',
						studyType:'',
						major:'',
						startDate:'',
						endDate:'',
						gpa:'',
						scholarships:[],
						experiences:[]
					}]
				}
			}
			,
			render:function(){
				var educations = this.props.educations;
				var eduEles = [];//教育经历的内容
				for(var i=0;i<educations.length;i++){
					var edu = educations[i];
					//在校实践
					var exe = edu.experiences&&edu.experiences.length>0?
								<div className="education-exeperience">
									<ul>
										{edu.experiences.map(function(e,index){return <li key={"education-exeperience"+i+"_"+index}>{e}</li>})}
									</ul>
								</div>:'';
					
					var section = 					
						<div key={"education_section-content_"+i} className="section-content">
								<div className="university">{edu.university}</div>								
								<div className="major"><span className="major-name">{edu.major}</span>|<span className="study-type">{edu.studyType}</span></div>
								<div className="date">
										<span>{edu.startDate}</span>
										<span>-	</span>
										<span>{edu.endDate}</span>
								</div>
								
								<div className="edu-content">
									<div className="score">
										{edu.gpa ? <div className="gpa"><span>GPA:{edu.gpa}</span></div> : null}
										{edu.scholarships && (edu.scholarships.length > 1 || (edu.scholarships[0]))?<div className="scholarship"><span>奖学金:{edu.scholarships.join(' ')}</span></div> : null}
									</div>
									{exe}
								</div>

						</div>
					
					eduEles.push(section);
				}
				return (
					<section className="section education-section">
						<h3 className="section-title">教育经历</h3>
						{eduEles}
					</section>
				)
			}
		})

		window.Educations.emptyJSON = {
						university:'',
						studyType:'',
						major:'',
						startDate:'',
						endDate:'',
						gpa:'',
						scholarships:[],
						experiences:[]
					};