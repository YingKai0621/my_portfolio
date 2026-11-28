# H2.7 — Choreography và visual review

Trạng thái: đã triển khai bản local để chủ sở hữu duyệt; **chưa tuyên bố đạt chất lượng tương đương MACACO**. Chỉ unified P2/P3; không khôi phục About độc lập, không thay P4–P6, P7 tiếp tục tạm dừng, không P8. Không commit/push/deploy.

## Video thực sự đã xem

- `docs/reference/Screen Recording 2026-11-27 232138.mp4`: bản quay MACACO 35,3 giây, 2558 × 1416. FFmpeg giải mã **00:05–00:21**, lấy 4 hình/giây thành hai contact sheet (64 hình); xem thêm 8 hình/giây ở 12,5–14,5s và 10 hình/giây ở 17,6–19,2s. Nhãn thời gian trên hai sheet lớn bắt đầu tại zero; phải cộng 5 hoặc 13 giây tương ứng.
- `C:/Users/taola/Videos/Screen Recordings/Screen Recording 2026-11-28 000545.mp4`: bản quay implementation mới nhất tìm thấy trên máy, nhưng hình ảnh vẫn là phiên bản trước H2.6 (còn About Bone riêng). Không gọi nó là bằng chứng hiện trạng H2.6. Hiện trạng được đối chiếu thêm bằng code H2.6 và các render local H2.7.
- Các sheet tạm: `%TEMP%/h27-reference-05-13.jpg`, `h27-reference-13-21.jpg`, `h27-reference-hand.jpg`, `h27-contact.jpg`, `h27-current.jpg`. Đây là tài liệu kiểm tra, không đưa vào public assets.

### Mốc quan sát, không phải thời lượng animation gốc

1. **05,25–09,25s:** toàn thân holographic, giáp có các phản xạ khác màu, vùng đen lớn, kiểu chữ ngang sau nhân vật. Đầu thay đổi hướng trong khoảng 06–09s; không suy ra góc khớp chính xác từ bản quay.
2. **09,25–09,75s:** camera tiến mạnh vào nhân vật; khoảng **09,75–12s** giữ helmet/chest/shoulder lớn, lệch trái. Các mặt giáp sáng vẫn tách khỏi khớp đen.
3. **12–13,25s:** đầu hướng xuống và bắt đầu đưa tay; các mảng sáng xuất hiện phía sau. Sheet dày 12,5–14,5s xác nhận lòng bàn tay và ngón mở rõ ở **13,25–13,75s**, rồi tư thế ngón thay đổi khoảng **13,75–14,5s**. Một số ngón bị giáp vai/chữ che; không khẳng định đã đo được toàn bộ quá trình nắm chặt hoặc một chuyển động ngẩng đầu thứ hai độc lập. Slow fist + head lift là choreography chủ sở hữu yêu cầu bổ sung.
4. **13–15,25s:** giáp chuyển tối trong khi kiến trúc sáng dần; từ **15,25–16,75s** các cấu trúc và ánh sáng chiếm phần lớn khung hình. Chuyển động có quan hệ thời gian với cử chỉ, nhưng không có bằng chứng về thuật toán/trigger nội bộ của studio.
5. **17–17,9s:** platform đã hiện; nhân vật đi vào từ phía trên. Đây là chuyển động xuống được quan sát, không đủ chứng minh một clip nhảy riêng hoặc một takeoff liền mạch.
6. **18–18,5s:** bóng dư nối theo đường rơi; khoảng **18,1–18,4s** chuyển sang tư thế chạm/nén trên platform. Camera dịch chuyển và bố cục hồi phục đồng thời; không thể tách chính xác shake khỏi camera track/scroll trong bản quay. Camera shake H2.7 là hiệu ứng nguyên bản theo yêu cầu, không phải thông số đo từ MACACO.
7. **18,5–19,75s:** tư thế thấp và giới thiệu trong cùng môi trường; **20–21s** cơ thể bắt đầu nâng lên, chữ outline và nội dung vẫn cùng scene.

## Chẩn đoán H2.6 và nhịp H2.7

Trước: `start: top top`, `end: += innerHeight * 14`, `pin: true`, `pinSpacing: true`, `scrub: true`; 12.600px ở viewport cao 900px. Không có GSAP timeline thời gian riêng; clip/camera/layer đều lấy normalized progress. Camera cộng toàn bộ hips offset đến tận descent, làm giảm cảm giác rơi tương đối với platform. Root còn cộng một vòng cung nâng/hạ bổ sung. SYSTEMS tồn tại xuyên About; hai panel About/experience còn chồng cửa sổ opacity.

Sau: cùng trigger, nhưng **28 viewport = 25.200px ở 900px**, gấp đôi quãng cuộn thực. Giữ `scrub: true`, không thêm độ trễ input, thư viện smooth scroll hay animation clock. Quãng identity đầu được chia đôi theo normalized progress để gần như giữ nguyên quãng cuộn/camera đã có. Các khoảng sau dành cho cử động thực, chuyển ánh sáng/aura và đọc nội dung.

- 0–13%: identity/awakening đã có, chuyển sang toàn thân.
- 13–28%: phản xạ holographic, đầu ngẩng, aura và camera push-in.
- 28–34,5%: camera giữ cận cảnh; trường ánh sáng/aura vẫn tiến theo scroll.
- 34,5–42,5%: đầu chuyển xuống; camera sang góc nhìn được lòng bàn tay.
- 42,5–49%: cánh tay đưa ra, bàn tay mở. Không có heading lớn che động tác.
- 49–59,2%: đầu nâng, các đốt ngón khép từ 50,5–57,8%; kiến trúc kích hoạt lệch pha từ 46%.
- 59,2–66%: giữ lực nắm, trả cánh tay về clip và chuẩn bị descent; camera mở để thấy môi trường/platform.
- 66–70,5%: descent thật của rig và camera tracking có giảm dần; hai afterimage lấy mẫu quá khứ.
- **70,5%:** bàn chân ngừng dịch xuống (khoảng 27% clip descent); xung ánh sáng và shake bắt đầu tại đây. 71,5% là tư thế nén sâu hơn, không còn bị nhầm là thời điểm bắt đầu contact.
- 70,5–75,5%: nén, hồi phục, tan afterimage, camera chuyển sang bố cục giới thiệu.
- 75,5–86%: About; opacity đầy đủ 77,2–84,8% (~1.915px để đọc ở 900px).
- 86,5–92,6%: Explorer / Engineer / Builder; 93,4–100%: Experience & Achievements. Robot vẫn hiện, scene kết thúc trực tiếp vào Selected Works.

Khoảng performance 13–75,5% có thể được xem như local subsection 0–100%; About có khoảng đọc riêng bên ngoài subsection này. Không áp dụng cứng tỷ lệ đề xuất khi nó làm ngắn phần giới thiệu.

## Rig và implementation nguyên bản

- GLB hiện có: một mesh asset với 119.332 vertex entries cộng qua các primitive; clips **power_on 2,6667s, build 7,3333s, descent 4,4s, idle 1,8333s**. Không có `jump` hay `hand_clench`. Giữ giới hạn quyền sử dụng local trong `P7_ASSET_PROVENANCE.md`.
- `cinematic-animation.ts`: AnimationMixer lấy mẫu thời gian tuyệt đối; trọng số clip có overlap. `Head_Jt`, `Neck_Jt` nhận pitch additive giới hạn, sau khi mixer phục hồi pose gốc mỗi lần seek; không dùng root để giả khớp cổ. `build` vẫn cung cấp shoulder/elbow/wrist/spine.
- Bàn tay phải: tracks `Right_Index`, `Right_Middle`, `Right_Anular`, `Right_Pinky`, `Right_Thumb`, các đốt `_1_Jt`–`_3_Jt`. Mẫu mở ở 68% build, mẫu grip ở 86%; giữ thân/cánh tay gần 75% build. Bốn ngón dài bổ sung flexion local-Z 0,32/0,60/0,55 rad; thumb giữ pose thật. Quaternion slerp kéo dài quá trình khép; không ghi đè mọi bone. Đây là authored additive grip, chưa phải animation được nghệ sĩ rig duyệt; va chạm chi tiết đầu ngón vẫn cần xem cận cảnh.
- Camera: các điểm đến có arrival và hold riêng, full-body → helmet lớn → góc thấy palm → wide descent → low landing → robot bên phải. Cận cảnh đã được xem ở 1440×900; không đo tự động tỷ lệ che phủ chính xác 65–80%. Camera bỏ dần việc bám hông ở 65–70,5%, không tự triệt tiêu chuyển động rơi nữa.
- Aura: ba ribbon 3D đứt/taper, 96 đoạn/ribbon, đường cong nhiễu xác định theo progress, shader spectral và depth test. Các phần vòng ra sau bị giáp che; tâm trường chuyển dần về vị trí thật của `Right_Middle_1_Jt`. Không có vòng phẳng hay particle cloud ngẫu nhiên.
- Material: giữ original maps/normal detail, phân biệt graphite/armor/emissive; đổi phổ theo view/Fresnel, giảm roughness và tăng phản xạ trong holographic. Joints chỉ nhận 8% spectral mix. Broad holographic rút từ 38–58,5%, còn cyan channels; có accent ngắn trong descent rồi về gunmetal. Đây là mô phỏng phổ bằng shader, không tuyên bố thin-film vật lý hoàn chỉnh.
- Background: domain-warped noise, vùng màu không đều trên nền gần đen, lượng tử màu và ordered dithering gắn với luminance. Bỏ dot overlay CSS đồng đều sau intro. Mọi thay đổi tiến theo cùng scroll, không reset tại shot boundary.
- Kiến trúc: tám cột thân kim loại tối, khe sáng hẹp với core/falloff; stagger bắt đầu gần gesture. Hai point light tăng theo charge/impact. PMREM studio-panel vẫn là reflection source, **không** có realtime cube reflection của từng cột. Platform hai lớp có chiều dày, mép cyan thấp và bóng tiếp xúc procedural. Bỏ vòng trắng tròn cũ. Chưa thêm particle burst hay hệ ripple mới; payoff dùng pose/shadow/light/afterimage/camera thay vì thêm hiệu ứng chưa kiểm chứng.
- Afterimage: hai `SkeletonUtils.clone`, mixer/skeleton riêng, geometry dùng chung, vật liệu silhouette không texture/PBR; lấy pose tại `p−0,006` và `p−0,012`, cùng root/ground correction. Dither/opacity tan sau contact; không dùng frame history. Không cấp phát clone trên mobile/thiết bị báo ít hơn sáu logical processors. Đây là heuristic, chưa phải GPU benchmark thích ứng.
- Contact: lấy bounds của skinned pose nén tại 71,5% một lần để hiệu chỉnh nền. Rig sampling xác nhận chân đã dừng ở ~27% descent, tương ứng 70,5% global. Không có solver IK/collision vật lý; tiếp xúc chi tiết knee/palm/sole vẫn cần duyệt. Không tuyên bố đã tạo dedicated jump clip; dùng rapid descent thật có chuẩn bị và follow-through.
- Shake: envelope analytic từ marker contact, downward/lateral impulse, 2,5 chu kỳ suy giảm, roll scale 0,0105 rad (~0,6° trước envelope), không cộng dồn. Kết thúc trong 2,5% progress; thời gian cảm nhận phụ thuộc tốc độ cuộn, không ép wait theo đồng hồ. Không rung DOM/navigation; tắt ở tier thấp/reduced motion.

## Typography, navigation và lỗi phát hiện

Chỉ một headline chủ đạo mỗi thời điểm; close-up/gesture không có headline lớn. SYSTEMS không được render trong About. Các cửa sổ About, traits, achievements không overlap; bản dịch/copy đã duyệt giữ nguyên. Bỏ `will-change` thường trực trên các chapter: lần tải trực tiếp `#about` từng có style đúng nhưng Chrome không paint text; kiểm tra lại sau khi bỏ layer promotion đã thấy text render đúng. Đây là lỗi paint/compositing riêng, không phải hydration.

Inspector chỉ development, bật bằng `?cinematicDebug=1`, có slider 0–1 và 19 review positions, nhãn EN/VI. Nó điều khiển scroll thật, không tạo nguồn progress thứ hai. Không xuất hiện trong production, mobile hoặc reduced motion. Skip/direct `#about` dùng 79%; `#work` vẫn là section thật. WebGL/context failure bỏ pin, trả nội dung về static flow; production vẫn không tải provisional GLB.

Next.js “1 Issue”: clean-profile Chrome không ghi nhận hydration warning/JS exception trong lượt render bình thường. Screenshot đã cung cấp trước đó chứa `cz-shortcut-listen="true"`, không có trong source; đây là dấu hiệu DOM bị sửa ngoài ứng dụng trước hydrate, phù hợp [tài liệu Next.js về browser extensions](https://nextjs.org/docs/messages/react-hydration-error). Không xác định được extension cụ thể từ môi trường clean; không tuyên bố đã sửa extension trên profile người dùng. Không thêm suppression hay tắt dev indicator.

## Kiểm tra và giới hạn review

- `npm.cmd run typecheck`: PASS. `npm.cmd run lint`: hoàn tất không có diagnostic. Sau khi visual review phát hiện lỗi paint của direct anchor và cần sửa fallback, chạy lại typecheck và ESLint chỉ các file cinematic: exit 0. Không chạy thêm build.
- Chrome CDP trực tiếp, không Playwright: EN 1440×900 tại 23 keyframe/intermediate positions; VI 1440×900 ở About/traits/achievements và P4 exit; VI 390×844 normal/reduced; Skip và direct About. Console thường không có exception/hydration warning; reduced motion chỉ có thông báo dự kiến từ Motion. Không tràn ngang ở các mẫu này.
- Đã xem các chuỗi ảnh chronological, không chỉ endpoint. Thử CDP screencast theo scroll liên tục 63–78% trong 10 giây; software WebGL chỉ cung cấp 9 frame, không đủ chứng minh smoothness/thời lượng shake trên GPU thật. Không báo FPS thực hay khẳng định motion đã đạt MACACO. Cần chủ sở hữu thử wheel/trackpad trên máy thực, đặc biệt reverse nhanh, inertia, contact và mức ảnh hưởng của afterimages.
- Thử cưỡng bức WebGL không khả dụng: pin được bỏ và direct About hiển thị toàn bộ nội dung trong static flow. THREE và artwork P4 phát console diagnostic dự kiến về context không khả dụng (không phải hydration); không che các thông báo này. Reduced-motion và no-WebGL đều không tràn ngang ở viewport kiểm tra.
- Review artifacts ở `%TEMP%/h27-final-*.png`, `h27-contact-final-*.png`, `h27-shots-a.jpg`, `h27-shots-b.jpg`, `h27-motion-frame-*.jpg`, `h27-vi-*.png`, `h27-mobile.png`, `h27-reduced.png`, `h27-direct-b.png`. Không nhúng vào website.
- Chưa xác nhận chất lượng trên mọi aspect ratio, touch hardware, GPU yếu hay quyền public-use của model. Aura/shader/lighting và grip vẫn cần owner visual approval; không coi implementation là final art approval.
- Không cài dependency, production build, Playwright, commit/push/deploy. Playwright **DEFERRED tới P11**.

Preview: `http://localhost:3000/en`, `http://localhost:3000/vi`; inspector: `http://localhost:3000/en?cinematicDebug=1` (tương tự `/vi`). Dừng tại H2.7 visual review gate.

## File scope H2.7

- Mới: `src/lib/glacier/cinematic-timing.ts`, `cinematic-aura.ts`, `cinematic-afterimages.ts`, báo cáo này.
- Sửa trong cinematic: `cinematic-animation.ts`, `cinematic-shot-plan.ts`, `cinematic-scene.ts`, `cinematic-materials.ts`, `cinematic-backdrop.ts`, `cinematic-environment.ts`, `cinematic-type.ts`.
- Integration/style: `src/components/sections/glacial-cinematic-stage.tsx`, vùng cinematic trong `src/app/globals.css`; EN/VI chỉ thêm ba nhãn inspector.
- Theo dõi phase: `docs/DECISIONS.md`, `docs/TASKS.md`, `docs/ARCHITECTURE.md`.
- Worktree đã có nhiều thay đổi từ trước; danh sách trên chỉ là phạm vi lượt H2.7, không phải toàn bộ `git status`.
