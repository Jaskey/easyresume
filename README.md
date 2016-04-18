# EasyResume

EasyResume简单的使用一个json文件，配置属于你的简历的内容，便能生成一个样式美观整齐的HTML页面，点击查看[demo](http://jaskey.github.io/resume/resume.html "例子")

------------
##Demo

[demo](http://jaskey.github.io/resume/resume.html "例子")

--------------
##快速开始

```
git clone https://github.com/Jaskey/easyresume.git
```

EasyResume的html文件需要使用HTTP的方式查看。若安装了python,可以使用

```
python -m SimpleHTTPServer
```
启动一个HTTP服务，然后在[http://localhost:8000](http://localhost:8000)下查看`resume.html`


## 配置JSON


###键值说明

key | 说明 | 类型 | 默认
------------- | -------------| -------------| -----------
name | 姓名 | 字符串 | null
birth | 生日 | 字符串 | null
tel| 电话 | 字符串 | null
blog|邮箱 | 字符串 | null
blog|博客地址 | 字符串 | null
avatar|头像地址 | 字符串 | xxxxxx
pages|个人主页链接 | 数组 | []
summary|概况 | 数组 | []
workExperience| 工作经历| 字符串 | []
projectExperience| 项目 | 字符串 | []
sections|其他需要额外添加的经历/段落 | 数组 | []
educations|教育经历 | 数组 | []


###个人主页配置

key: pages

配置例子：

       		"pages":[
				{"zhihu":"http://www.zhihu.com/people/linjunjie1103"},
				{"stackoverflow":"http://stackoverflow.com/users/2087628/jaskey"},
				{"github":"https://github.com/Jaskey"},
				{"linkedin":"http://www.linkedin.com/in/jaskeylam/zh-cn?locale=zh_CN&trk=profile_view_lang_sel_click"},
				{"douban":"http://www.douban.com/people/linjunjie1103/"}
			]

对象中每个key代表一个主页类型，value是对应的链接。

key将用于渲染对应的图标，目前支持的图标有：

key | 主页
-------|-----------
stackoverflow| StackOverflow
zhihu| 知乎
github| Github
linkedin| 领英
douban| 豆瓣
segmentfault| SegmentFault
wechat| 微信
lofter| Lofter
weibo| 新浪微博

## Donations



## License
Available under [the MIT license](http://mths.be/mit).