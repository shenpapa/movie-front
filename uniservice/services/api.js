
// 获取页面的静态图片，图标的地址
function statics(ctx, next) {
    const pics = {
        tabBarIcon: [
            {index: 'images/tabBarIcon/index.png', index_sel: 'images/tabBarIcon/index_sel.png'},
            {index: 'images/tabBarIcon/me.png', index_sel: 'images/tabBarIcon/me_sel.png'},
            {index: 'images/tabBarIcon/search.png', index_sel: 'images/tabBarIcon/search_sel.png'}
        ],
        carousel: [
            {index: 'images/carousel/batmanvssuperman.png'},
            {index: 'images/carousel/spiderman.png'},
        ],
        poster: [
            {index: 'images/poster/civilwar.jpg', name: '蝙蝠侠： 黑暗骑士', score: '9.3'},
            {index: 'images/poster/civilwar.jpg', name: '蝙蝠侠： 黑暗骑士', score: '9.3'},
            {index: 'images/poster/civilwar.jpg', name: '蝙蝠侠： 黑暗骑士', score: '9.3'},
            {index: 'images/poster/civilwar.jpg', name: '蝙蝠侠： 黑暗骑士', score: '9.3'},
            {index: 'images/poster/civilwar.jpg', name: '蝙蝠侠： 黑暗骑士', score: '9.3'}
        ],
        pre: [
            { index: 'video/pre.mp4', cover: 'images/carousel/spiderman.png' },
            { index: 'video/pre.mp4', cover: 'images/carousel/spiderman.png' },
            { index: 'video/pre.mp4', cover: 'images/carousel/spiderman.png' },
            { index: 'video/pre.mp4', cover: 'images/carousel/spiderman.png' }
        ],
        like: [
            { index: 'images/poster/justice.png', name: '正义联盟', desc: '2018 / 美国 / 科幻 / 超级英雄', time: '上映时间： 2012-05-05（中国大陆）' },
            { index: 'images/poster/justice.png', name: '正义联盟', desc: '2018 / 美国 / 科幻 / 超级英雄', time: '上映时间： 2012-05-05（中国大陆）' },
            { index: 'images/poster/justice.png', name: '正义联盟', desc: '2018 / 美国 / 科幻 / 超级英雄', time: '上映时间： 2012-05-05（中国大陆）' },
            { index: 'images/poster/justice.png', name: '正义联盟', desc: '2018 / 美国 / 科幻 / 超级英雄', time: '上映时间： 2012-05-05（中国大陆）' },
            { index: 'images/poster/justice.png', name: '正义联盟', desc: '2018 / 美国 / 科幻 / 超级英雄 ', time: '上映时间： 2012-05-05（中国大陆）' }
        ]
    }
    const { type } = ctx.query
    switch(type) {
        case 'tabBarIcon':
            ctx.body = pics.tabBarIcon
            break
        case 'carousel' :
            ctx.body = pics.carousel
            break
        case 'poster' :
            ctx.body = pics.poster
            break
        case 'pre':
            ctx.body = pics.pre
            break
        case 'like':
            ctx.body = pics.like
    }
}


module.exports = { statics }