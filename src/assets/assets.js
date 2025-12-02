import logo from './logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import group_users from './group_users.png'
import { BookMarked, Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    group_users,
    sponsored_img
}

export const menuItemsData = [
    { to: '/', label: 'Bảng tin', Icon: Home },
    { to: '/messages', label: 'Tin nhắn', Icon: MessageCircle },
    { to: '/connections', label: 'Kết nối', Icon: Users },
    { to: '/discover', label: 'Khám Phá', Icon: Search },
    { to: '/collections', label: 'Bộ sưu tập', Icon: BookMarked },
    { to: '/profile', label: 'Trang cá nhấn', Icon: UserIcon },
];

export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "Hoàng Vũ",
    "username": "hoangvu",
    "bio": "xin chào mình là Hoàng Vũ đây",
    "profile_picture": sample_profile,
    "cover_photo": sample_cover,
    "location": "Hóc Môn, TPHCM",
    "followers": ["user_2", "user_3"],
    "following": ["user_2", "user_3"],
    "connections": ["user_2", "user_3"],
    "posts": [],
    "is_verified": true,
    "createdAt": "2025-07-09T09:26:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "philong",
    full_name: "Phi Long",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
}

const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "longvu",
    full_name: "Long Vũ",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
}

export const dummyStoriesData = [
    {
        "_id": "68833d466e4b42b685068860",
        "user": dummyUserData,
        "content": "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄. The next post will make more sense 🧩.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-24T08:02:06.958Z",
        "updatedAt": "2025-07-25T08:16:06.958Z",
    },
    {
        "_id": "688340046e4b42b685068a73",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:48.134Z",
        "updatedAt": "2025-07-25T08:27:48.134Z",
    },
    {
        "_id": "68833fe96e4b42b685068a5e",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
        "media_type": "video",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:21.289Z",
        "updatedAt": "2025-07-25T08:27:21.289Z",
    },
    {
        "_id": "68833e136e4b42b685068937",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:19:31.080Z",
        "updatedAt": "2025-07-25T08:19:31.080Z",
    },
    {
        "_id": "68833d706e4b42b685068875",
        "user": dummyUserData,
        "content": "🤫 Not every moment needs to be loud. Sometimes, the best things happen in silence — in drafts 📝, in progress 🧪, in planning 📊. That's where I am right now.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:16:48.617Z",
        "updatedAt": "2025-07-25T08:16:48.617Z",
    },
    {
        "_id": "68833c9e6e4b42b6850687e7",
        "user": dummyUserData,
        "content": "✨ Something meaningful is on the way. I'm working behind the scenes 🛠️ to bring it all together. This space is just the beginning 🌱. Stay tuned 👀.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:13:18.111Z",
        "updatedAt": "2025-07-25T08:13:18.111Z",
    }
]


export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": " Bữa sáng hay còn gọi là bữa điểm tâm, là một trong bữa ăn quan trọng đối với sức khỏe con người. Các chuyên gia dinh dưỡng khuyến cáo tuyệt đối bạn không nên bỏ qua bữa sáng. Với tầm quan trọng của nó, bữa sáng được người hâm mộ quan tâm và lựa chọn. Để bữa sáng thêm đa dạng, bạn có thể điểm qua các hình ảnh món ăn ngon để có menu thực đơn đa dạng.",
        "image_urls": [
            "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUserData,
        "content": "Phở bò được CNN chọn là 28 trên tổng số 50 món ăn ngon nhất thế giới (2011). Khi thưởng thức bạn sẽ cảm nhận được những miếng nạm giòn, miếng gầu béo, bánh phở dai mịn, hành lá chẻ và nhiều hành hoa. Nếu bạn là người nghiện phở thì chúng tôi tin chắc rằng 2 bát tô đầy mới đủ làm bạn thỏa mãn. 🌱✨\r\n\r\n#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
        "image_urls": [
            "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-5.jpg"
        ],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUserData,
        "content": "Năm 2012, bún riêu cua đã được CNN bình chọn là một trong những món ăn hấp dẫn nhất châu Á. Đó là vinh hạnh cũng là minh chứng rằng, điều tuyệt vời nhất đôi khi chỉ đến từ những thứ đơn giản nhất.",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e3e47ba0cf0fecba19947",
        "user": dummyUserData,
        "content": "",
        "image_urls": [
            "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-8.jpg"
        ],
        "post_type": "image",
        "likes_count": [
            "user_2zdJbcAqiOX9jq2DIueBRQn0lMt"
        ],
        "createdAt": "2025-07-09T10:02:47.213Z",
        "updatedAt": "2025-07-09T10:09:37.075Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUserData,
        "content": "Cơm tấm là món đặc sản của miền Nam Việt Nam, nó là một trong những món ăn sáng được ưa chuộng nhất của người miền Nam. Điểm đặc biệt là ăn cơm tấm phải có nước mắm ngọt, là nước mắm pha với nước lọc và thêm đường.Tùy theo cách chế biến và khẩu vị của người ăn, nước mắm có thể ngọt nhiều hoặc ngọt mặn.",
        "image_urls": [
            "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-12.jpg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    },
    {
        "_id": "686e361389841ba9f2633201",
        "user": dummyUserData,
        "content": "xin chào đây là bài post đầu tiên",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T09:27:47.529Z",
        "updatedAt": "2025-07-09T09:27:47.529Z",
    }
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "I seen your profile",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData,
        "to_user_id": dummyUserData,
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser3Data,
        "to_user_id": dummyUserData,
        "text": "how are you",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "yah , this tablet is good",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    },
        {
        "_id": "6878cc2817a54e4d3748010c",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "you can purchase it from amazon",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-08-17T10:10:48.956Z",
        "updatedAt": "2025-08-25T10:43:50.346Z",
        "seen": true
    },
]

export const dummyConnectionsData = [
    dummyUserData,
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyPendingConnectionsData = [
    dummyUserData
]

export const dummyRecipeCollection = [
    {
        "_id": "recipe-01",
        "name": "Phở Bò Truyền Thống",
        "description": "Nước dùng thanh ngọt được hầm từ xương ống bò trong nhiều giờ, kết hợp với bánh phở mềm và thịt bò tái chuẩn vị Hà Nội.",
        "category": "Món chính",
        "difficulty": "Trung bình",
        "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
        "tags": ["phở", "bữa sáng", "món nước"],
        "ingredients": [
            "1kg xương ống bò",
            "500g bánh phở tươi",
            "300g thịt bò thăn",
            "Gừng, hành tím, quế, hồi, thảo quả",
            "Rau thơm, hành lá, chanh, ớt"
        ],
        "steps": [
            "Nướng sơ gừng và hành tím, đập dập để tạo mùi thơm.",
            "Hầm xương cùng quế, hồi, thảo quả trong 3 giờ để lấy nước dùng.",
            "Chần bánh phở, thịt bò và cho vào tô.",
            "Chan nước dùng nóng, thêm hành lá, rau thơm và các topping yêu thích."
        ],
        "servings": 4,
        "prepTime": 30,
        "cookTime": 180,
        "createdAt": "2025-07-01T08:00:00.000Z"
    },
    {
        "_id": "recipe-02",
        "name": "Gỏi Cuốn Tôm Thịt",
        "description": "Món ăn nhẹ thanh mát với bánh tráng dẻo, rau sống, bún tươi và phần nhân tôm thịt hài hòa.",
        "category": "Món khai vị",
        "difficulty": "Dễ",
        "image": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        "tags": ["healthy", "ăn nhẹ", "không chiên"],
        "ingredients": [
            "12 bánh tráng",
            "200g tôm sú",
            "200g thịt ba chỉ",
            "Rau sống, xà lách, húng quế",
            "Bún tươi"
        ],
        "steps": [
            "Luộc chín tôm và thịt, cắt lát vừa ăn.",
            "Trải bánh tráng, xếp rau, bún, tôm thịt lên trên.",
            "Cuộn chặt tay và thưởng thức cùng nước chấm mắm nêm hoặc tương đậu phộng."
        ],
        "servings": 6,
        "prepTime": 25,
        "cookTime": 15,
        "createdAt": "2025-07-05T10:00:00.000Z"
    },
    {
        "_id": "recipe-03",
        "name": "Bánh Mì Thịt Nướng",
        "description": "Ổ bánh mì giòn rụm kẹp thịt heo nướng thơm lừng, đồ chua giòn và lớp pate béo ngậy.",
        "category": "Ăn sáng",
        "difficulty": "Trung bình",
        "image": "https://images.pexels.com/photos/3590400/pexels-photo-3590400.jpeg",
        "tags": ["streetfood", "grill", "quick"],
        "ingredients": [
            "4 ổ bánh mì",
            "400g thịt cổ vai",
            "Pate, bơ, sốt mayonnaise",
            "Dưa leo, đồ chua, rau mùi",
            "Gia vị ướp: sả, tỏi, ngũ vị hương"
        ],
        "steps": [
            "Ướp thịt với sả, tỏi, ngũ vị hương ít nhất 1 giờ.",
            "Nướng thịt trên than hoặc chảo cho đến khi vàng thơm.",
            "Xẻ bánh mì, phết pate, bơ rồi lần lượt cho thịt, rau và đồ chua vào."
        ],
        "servings": 4,
        "prepTime": 20,
        "cookTime": 25,
        "createdAt": "2025-07-12T07:30:00.000Z"
    },
    {
        "_id": "recipe-04",
        "name": "Chè Khúc Bạch",
        "description": "Món tráng miệng mát lạnh với khúc bạch mềm béo, trái cây tươi và nước đường vải thơm dịu.",
        "category": "Tráng miệng",
        "difficulty": "Dễ",
        "image": "https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg",
        "tags": ["dessert", "mùa hè", "lạnh"],
        "ingredients": [
            "200ml kem tươi",
            "200ml sữa tươi không đường",
            "10g gelatin",
            "Hạnh nhân lát rang",
            "Trái cây: nhãn, vải, dâu"
        ],
        "steps": [
            "Ngâm nở gelatin, sau đó đun cùng sữa và kem tươi cho tan.",
            "Đổ hỗn hợp vào khuôn, để lạnh 4 giờ rồi cắt khối vừa ăn.",
            "Nấu nước đường với nhãn/vải, để nguội.",
            "Cho khúc bạch, trái cây vào chén và chan nước đường, rắc hạnh nhân."
        ],
        "servings": 6,
        "prepTime": 15,
        "cookTime": 10,
        "createdAt": "2025-07-18T14:15:00.000Z"
    }
]