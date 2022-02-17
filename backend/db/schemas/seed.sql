TRUNCATE TABLE `users`;
INSERT INTO users(
	login_id,
	name,
	password
)
values(
	'fullstack',
	'Fullstack Engineer',
	'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
);

TRUNCATE TABLE `lighting_talks`;

insert into lighting_talks(topic,content,poster_id) values
(
	'Failsafe 3.2 Released with New Resilience Policies',
	'Failsafe, a lightweight fault tolerance library for Java 8+, launched the major 3.0 release in November 2021. This release introduced some breaking changes to the API, a new dev.failsafe package and new Maven groupId, a builder API for all the policies, plus some redesigned methods for Circuit Breaker, Retry Policy, Standalone Execution and Async Execution.  Failsafe, a lightweight fault tolerance library for Java 8+, launched the major 3.0 release in November 2021. This release introduced some breaking changes to the API, a new dev.failsafe package and new Maven groupId, a builder API for all the policies, plus some redesigned methods for Circuit Breaker, Retry Policy, Standalone Execution and Async Execution.  More recently, Failsafe announced the availability of version 3.2 which introduced new Rate Limiter and Bulkhead policies.',
	1
),
(
	'Azul Launches Java Cloud Compiler',
	'Azul has launched a new cloud-native compiler that offloads Java JIT compilation from a local system to an elastic resource, lowering the amount of resources needed to run the application and improving time to peak performance.The Java runtime is a fully self-reliant system, designed to run and improve code on a single system. The runtime works through Just In Time (JIT) compilation, using local resources that convert Java bytecode (JAR and class files) to native machine code to improve the speed and memory. Simon Ritter, Deputy CTO of Azul explains this process in a blog about Understanding Java Compilation, laying out details of how code is improved over time. JIT compilation is transparent to most users, requiring no interaction from a developer or administrator, however curious developers can monitor its role through tools like JITWatch. By offloading this JIT compilation to a separate system, Azul''s cloud compiler can perform JIT faster, share optimizations between systems that run the same code, and return resources to the application to either improve throughput or decrease the total CPU/RAM needed and lower cost.',
	1
);