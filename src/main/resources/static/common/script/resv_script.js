
    let selectedHours = {
    start: -1,
    startIndex: -1,
    end: -1,
    endIndex: -1,
};

    document.getElementById('reservation-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;

    if (name && phone && date) {
    alert(`예약 완료! \n이름: ${name} \n연락처: ${phone} \n날짜: ${date}`);
} else {
    alert('모든 필드를 입력해 주세요.');
}
});

    // 시간 선택 테이블 동적 생성
    const timeTable = document.createElement("ul");
    timeTable.classList.add('time_list');

    const times = [
    {time: '18시', selected: false, noTime: false, realHour: 18},
    {time: '', selected: false, noTime: true, realHour: 18.5},
    {time: '19시', selected: false, noTime: false, realHour: 19},
    {time: '', selected: false, noTime: true, realHour: 19.5},
    {time: '20시', selected: false, noTime: false, realHour: 20},
    {time: '', selected: false, noTime: true, realHour: 20.5},
    {time: '21시', selected: false, noTime: false, realHour: 21},
    {time: '', selected: false, noTime: true, realHour: 21.5},
    {time: '22시', selected: false, noTime: false, realHour: 22},
    {time: '', selected: false, noTime: true, realHour: 22.5},
    {time: '23시', selected: false, noTime: false, realHour: 23},
    {time: '', selected: false, noTime: true, realHour: 23.5},
    {time: '24시', selected: false, noTime: false, realHour: 24}
    ];

    // 시간 항목 생성
    times.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('time_item', 'half');

    if (item.selected) {
    listItem.classList.add('selected');
}

    if (item.noTime) {
    listItem.classList.add('no_time');
}

    const timeText = document.createElement('span');
    timeText.classList.add('time_text');
    timeText.textContent = item.time;

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn_time', 'color10');

    // 클릭 이벤트 처리
    listItem.addEventListener('click', () => {
    let currentClickedTime = times[index].realHour;

    if (selectedHours.start < 0) {
    selectedHours.start = currentClickedTime;
    selectedHours.startIndex = index;
    listItem.classList.add('selected');
} else if (selectedHours.end < 0) {
    selectedHours.end = currentClickedTime;
    selectedHours.endIndex = index;
    document.querySelectorAll("li.time_item.half").forEach((v, i) => {
    if (i >= selectedHours.startIndex && i <= selectedHours.endIndex)
    v.classList.add('selected');
});
} else {
    selectedHours.start = currentClickedTime;
    selectedHours.startIndex = index;
    selectedHours.end = -1;
    selectedHours.endIndex = -1;
    document.querySelectorAll("li.time_item.half").forEach((v) => {
    v.classList.remove('selected');
});
    listItem.classList.add('selected');
}

    console.log(times[index].realHour + " 누름");
});

    // 생성된 요소들을 리스트 아이템에 추가
    listItem.appendChild(timeText);
    listItem.appendChild(button);

    // <ul>에 리스트 아이템을 추가
    timeTable.appendChild(listItem);
});

    document.getElementById("reservation-time").appendChild(timeTable);
