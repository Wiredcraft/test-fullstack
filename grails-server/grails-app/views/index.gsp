<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Demo Page</title>
</head>

<body>
<div id="main"></div>
<g:if test="${grails.util.GrailsUtil.environment.startsWith("production")}">
    <asset:javascript src="app.bundle.js"/>
</g:if>
<g:else>
    <script src="http://localhost:3000/dev/app.bundle.js"></script>
</g:else>
</body>
</html>