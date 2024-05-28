const cacheName = "PWA Microservices"
const preCache = ["/","/login.html","/home.html","/forgotpassword.html","/myCourse.html","/dashboard.html","/user/grade.html","/user/preferences.html","/user/profile.html","/course/course1.html","/course/course2.html","/course/course3.html","/course/course4.html","/course/diskusi.html"]


self.addEventListener("install", (e) => {
  console.log("Service Worker Installed")

  e.waitUntil((async ()=>{
    const cache = await caches.open(cacheName)
    cache.addAll(preCache)
  })(),
)
})

self.addEventListener("fetch",(e)=>{
  e.respondWith((async ()=>{
    const cache = await caches.open(cacheName)
    const resCache = await cache.match(e.request)

    if(resCache) return resCache

    try{
      const res = await fetch(e.request)

      cache.put(e.request,res.clone())
      return res
    } catch (error) {
      console.log(error)
    }
  })(),)
})