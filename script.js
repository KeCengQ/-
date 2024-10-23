document.addEventListener('DOMContentLoaded', function() {
    const linkList = document.getElementById('linkList');
    const links = Array.from(linkList.querySelectorAll('.link-wrapper')); // 获取所有链接包装器

    // 初始化点击次数数据，从 LocalStorage 读取
    const clickCounts = {};
    links.forEach(linkWrapper => {
        const link = linkWrapper.querySelector('.link');
        const name = link.dataset.name;
        const countElement = linkWrapper.querySelector('.click-count');
        // 尝试从 LocalStorage 中获取点击次数，如果没有则初始化为 0
        const savedCount = localStorage.getItem(`clickCount_${name}`);
        clickCounts[name] = { linkWrapper, count: savedCount ? parseInt(savedCount, 10) : 0 };
        countElement.textContent = clickCounts[name].count; // 初始化显示
    });

    // 更新页面上的点击次数并排序列表
    function updateAndSortLinks() {
        // 转换为数组以便排序
        const sortableLinks = Object.entries(clickCounts).map(([name, { linkWrapper, count }]) => ({ name, linkWrapper, count }));
        // 按点击次数降序排序
        sortableLinks.sort((a, b) => b.count - a.count);
        // 清空列表并重新添加排序后的链接项
        linkList.innerHTML = '';
        sortableLinks.forEach(({ name, linkWrapper }) => {
            linkList.appendChild(linkWrapper);
        });
    }

    // 设置点击事件监听器
    links.forEach(linkWrapper => {
        const link = linkWrapper.querySelector('.link');
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为
            const name = link.dataset.name;
            clickCounts[name].count++; // 增加点击次数
            clickCounts[name].linkWrapper.querySelector('.click-count').textContent = clickCounts[name].count; // 更新显示
            // 保存到 LocalStorage
            localStorage.setItem(`clickCount_${name}`, clickCounts[name].count);
            updateAndSortLinks(); // 更新并排序列表
            window.open(link.href, '_blank'); // 在新标签页中打开链接
        });
    });
});
