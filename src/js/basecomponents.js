		window.Fragment = React.createClass({
			getDefaultProps:function(){
				return {
					option:{
						name:'',
						comment:'',
						startDate:'',
						endDate:'',
						summary:'',
						details:[]
					}
				}
			},
			render:function(){
						var frag = this.props.option;
						
						if(frag.startDate&&frag.endDate){
							var _dateComp =<div className="date">
										<span>{frag.startDate}</span>
										<span>-</span>
										<span>{frag.endDate}</span>
									  </div>
						}
						
						if(frag.summary){
							var _summaryComp =
									<div className="fragment-summary">
										<div>{frag.summary}</div>
									</div>
						}
						
						return (
							<div className="fragment">
								<div className="circle-point"></div>
								<div className="fragment-content-wrapper">
									<span className="fragment-name">{frag.name}</span>			
									<span className="fragment-comment">{frag.comment}</span>			
									<div className="fragment-content">
										{_summaryComp}
										<div className="fragment-list">
											<ul>
												{frag.details.map(function(e,i){return <li key={"frament_"+i}>{e}</li>})}
											</ul>
										</div>
										
										{_dateComp}
										
									</div>
								</div>
							</div>
						)
			}
		});

		window.Fragment.emptyJSON = {
			name:'',
			comment:'',
			startDate:'',
			endDate:'',
			summary:'',
			details:[]
		};

		/**
		一整块区域，一个section下面每一段子区域为Fragment
		**/
		window.Section = React.createClass({
			getDefaultProps:function(){
				return {
					title:"sectionTitle",
					fragments:[],
					points:[]
				}
			},
			
			render:function(){
				var cSection;
				if(this.props.fragments.length>0){
					var frags=[];
					for(var i=0;i<this.props.fragments.length;i++){
						var frag = this.props.fragments[i];
						var fragComponent=<Fragment key={"fragment_"+i} option={frag}/>//一个Fragment component
						frags.push(fragComponent);
					}
					var actualEle = frags;
					cSection = <div className="timeline-section-content">{actualEle}</div>
				}else if(this.props.points.length>0){
					var liElement = [];
					for(var i=0;i<this.props.points.length;i++){
						var point = this.props.points[i];
						liElement.push(<li key={"point_"+i}>{point}</li>);
					}
					var pointEle=<div className="points-container"><ul>{liElement}</ul></div>;
					var actualEle = pointEle;
					cSection = <div className="section-content">{actualEle}</div>
				}
				return (
							<div className="section">
								<h2 className="section-title">{this.props.title}</h2>
								{cSection}
							</div>
					)
			}
			
		});

		window.Section.emptyJSON = {
			title:"sectionTitle",
			fragments:[],
			points:[]
		}