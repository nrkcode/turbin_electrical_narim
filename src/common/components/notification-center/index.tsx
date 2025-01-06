"use client"

import { Bell, Trash2, SquareCheckBig, Square } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { IconFormatter } from "@/common/components/notification-center/icon"

import styles from "./style/notification.module.css"

const notificationData = [
	{
		id: "12314",
		type: "notice",
		title: "알림입니다",
		message: "알림상세메시지",
		link: "/trading",
		read: true,
		date: "2025-01-05 12:00",
		deleted_at: "",
	},
	{
		id: "23425",
		type: "warnig",
		title: "중요 공지사항",
		message: "시스템 점검 예정입니다",
		link: "",
		read: false,
		date: "2025-01-06 09:30",
		deleted_at: "",
	},
	{
		id: "34536",
		type: "alram",
		title: "업데이트 안내",
		message: "새로운 기능이 추가되었습니다",
		link: "",
		read: true,
		date: "2025-01-06 15:45",
		deleted_at: "",
	},
	{
		id: "45647",
		type: "region page",
		title: "긴급 알림",
		message: "서버 오류가 발생했습니다",
		link: "",
		read: false,
		date: "2025-01-07 03:20",
		deleted_at: "",
	},
	{
		id: "56758",
		type: "notice",
		title: "이벤트 안내",
		message: "신년 맞이 특별 이벤트 시작",
		link: "",
		read: false,
		date: "2025-01-07 10:00",
		deleted_at: "",
	},
	{
		id: "34526",
		type: "alram",
		title: "업데이트 안내",
		message: "새로운 기능이 추가되었습니다",
		link: "",
		read: false,
		date: "2025-01-07 15:45",
		deleted_at: "",
	},
	{
		id: "33526",
		type: "alram",
		title: "업데이트 안내",
		message: "새로운 기능이 추가되었습니다",
		link: "",
		read: false,
		date: "2025-01-07 15:45",
		deleted_at: "",
	},
	{
		id: "163414",
		type: "notice",
		title: "알림입니다",
		message: "알림상세메시지",
		link: "/trading",
		read: false,
		date: "2025-01-05 12:00",
		deleted_at: "",
	},
	{
		id: "12886666",
		type: "notice",
		title: "알림입니다",
		message: "알림상세메시지",
		link: "/trading",
		read: false,
		date: "2025-01-05 12:00",
		deleted_at: "",
	},
]

export function NotificationPopup() {
	const [notifications, setNotifications] = useState(notificationData)
	const popupRef = useRef<HTMLDivElement>(null)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleNotification = () => {
		setIsOpen((prev) => !prev)
	}

	const setRead = (id: string | number) => {
		setNotifications((prev) =>
			prev.map((noti) => (noti.id === id ? { ...noti, read: true } : noti)),
		)
	}
	const toggleRead = (id: string | number) => {
		setNotifications((prev) =>
			prev.map((noti) =>
				noti.id === id ? { ...noti, read: !noti.read } : noti,
			),
		)
	}

	const handleLink = (link: string | undefined) => {
		if (link != undefined && link != "") {
			window.location.href = link
		}
	}

	const deleteNotification = (id: string) => {
		setNotifications((prev) => prev.filter((noti) => noti.id !== id))
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const unreadCount = notifications.filter((noti) => !noti.read).length

	return (
		<div className="relative w-fit" ref={popupRef}>
			<button onClick={toggleNotification} className="flex items-center">
				<Bell
					size={20}
					className={`cursor-pointer text-gray-700 hover:text-tbGreen ${
						unreadCount > 0 && styles.blinkAnimation
					}`}
				/>
				{unreadCount > 0 && (
					<span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
						{unreadCount}
					</span>
				)}
			</button>

			{isOpen && (
				<div
					className={
						"absolute -right-8 top-14 z-10 mt-2 flex h-96 w-72 flex-col gap-1 overflow-y-auto rounded-2xl bg-white p-3 text-slate-700 shadow-md transition duration-200 ease-in [&::-webkit-scrollbar]:hidden"
					}
				>
					<div className="flex flex-col gap-1">
						{notifications.map((noti) => {
							const formattedDate = new Date(noti.date)
							return (
								<div
									key={noti.id}
									className="alert-item translate group relative h-fit w-full overflow-hidden rounded-xl border-none bg-background py-1 duration-100 hover:border hover:bg-gray-100 hover:text-tbGreen"
								>
									<div
										className={`absolute left-2 top-2 z-10 h-2 w-2 rounded-full bg-red-400 ${noti.read && "opacity-0"}`}
									></div>
									<div
										className={`flex h-full w-full flex-row gap-2 px-2 ${noti.read && "opacity-50"}`}
									>
										<div
											className={`${styles.icon} relative col-span-1 flex h-full w-fit items-center justify-center`}
										>
											<IconFormatter type={noti.type} size={16} />
											<button
												onClick={() => toggleRead(noti.id)}
												className={`absolute left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-white text-black opacity-0 transition-all duration-300 ${styles.check}`}
											>
												{noti.read ? (
													<SquareCheckBig size={18} />
												) : (
													<Square size={18} />
												)}
											</button>
										</div>
										<button
											onClick={() => {
												setRead(noti.id)
												handleLink(noti.link)
											}}
											className="flex h-full w-full flex-col space-y-1"
										>
											<div className="flex w-full justify-between">
												<div className="alert-title text-start text-sm font-semibold">
													{noti.title}
												</div>
												<div className="alert-date text-end text-xs text-gray-400">
													{formattedDate.getMonth() +
														1 +
														"/" +
														formattedDate.getDate() +
														" " +
														formattedDate.getHours() +
														":" +
														formattedDate.getMinutes()}
												</div>
											</div>
											<div className="alert-message whitespace-nowrap text-start text-xs">
												{noti.message}
											</div>
										</button>
										<div className={`${styles.bar} h-full w-2`}>
											<button
												onClick={() => deleteNotification(noti.id)}
												className={`${styles.trash} transiion-all absolute -right-10 top-1/2 flex h-24 w-8 -translate-y-1/2 transform items-center justify-center bg-white text-red-500 opacity-0 duration-200`}
											>
												<Trash2 size={14} />
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
